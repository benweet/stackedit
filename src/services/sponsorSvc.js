import store from '../store';
import networkSvc from './networkSvc';
import utils from './utils';

const checkPaymentEvery = 15 * 60 * 1000; // 15 min
let lastCheck = 0;

const appId = 'ESTHdCYOi18iLhhO';
let monetize;

const getMonetize = () => Promise.resolve()
  .then(() => networkSvc.loadScript('https://cdn.monetizejs.com/api/js/latest/monetize.min.js'))
  .then(() => {
    monetize = monetize || new window.MonetizeJS({
      applicationID: appId,
    });
  });

const isGoogleSponsor = () => {
  const sponsorToken = store.getters['workspace/sponsorToken'];
  return sponsorToken && sponsorToken.isSponsor;
};

const checkPayment = () => {
  const currentDate = Date.now();
  if (!isGoogleSponsor()
    && networkSvc.isUserActive()
    && !store.state.offline
    && !store.state.light
    && lastCheck + checkPaymentEvery < currentDate
  ) {
    lastCheck = currentDate;
    getMonetize()
      .then(() => monetize.getPaymentsImmediate((err, payments) => {
        const isSponsor = payments && payments.app === appId && (
          (payments.chargeOption && payments.chargeOption.alias === 'once') ||
          (payments.subscriptionOption && payments.subscriptionOption.alias === 'yearly'));
        if (isSponsor !== store.state.monetizeSponsor) {
          store.commit('setMonetizeSponsor', isSponsor);
        }
      }));
  }
};

export default {
  init: () => {
    utils.setInterval(checkPayment, 2000);
  },
  getToken() {
    if (isGoogleSponsor() || store.state.offline) {
      return Promise.resolve();
    }
    return getMonetize()
      .then(() => new Promise(resolve =>
        monetize.getTokenImmediate((err, result) => resolve(result))));
  },
};
