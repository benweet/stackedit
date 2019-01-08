import moduleTemplate from './moduleTemplate';
import empty from '../data/empties/emptySyncedContent';

const theModule = moduleTemplate(empty, true);

theModule.getters = {
  ...theModule.getters,
  current: ({ itemsById }, getters, rootState, rootGetters) =>
    itemsById[`${rootGetters['file/current'].id}/syncedContent`] || empty(),
};

export default theModule;
