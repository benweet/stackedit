const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const radix = alphabet.length;
const array = new Uint32Array(20);

export default {
  uid() {
    crypto.getRandomValues(array);
    return array.map(value => alphabet[value % radix]).join('');
  },
};
