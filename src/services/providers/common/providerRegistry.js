export default {
  providersById: {},
  register(provider) {
    this.providersById[provider.id] = provider;
    return provider;
  },
};
