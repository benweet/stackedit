export default {
  providers: {},
  register(provider) {
    this.providers[provider.id] = provider;
    return provider;
  },
};
