import dropboxProvider from './dropboxProvider';
import providerRegistry from './providerRegistry';

export default providerRegistry.register({
  ...dropboxProvider,
  id: 'dropboxRestricted',
  fullAccess: false,
});
