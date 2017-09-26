import store from '../../store';
import zendeskHelper from './helpers/zendeskHelper';
import providerRegistry from './providerRegistry';

export default providerRegistry.register({
  id: 'zendesk',
  getToken(location) {
    return store.getters['data/zendeskTokens'][location.sub];
  },
  getUrl(location) {
    const token = this.getToken(location);
    return `https://${token.subdomain}.zendesk.com/hc/${location.locale}/articles/${location.articleId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.articleId} — ${token.name} — ${token.subdomain}`;
  },
  publish(token, html, metadata, publishLocation) {
    return zendeskHelper.uploadArticle(
      token,
      publishLocation.sectionId,
      publishLocation.articleId,
      metadata.title,
      html,
      metadata.tags,
      publishLocation.locale,
      metadata.status === 'draft',
    )
      .then(articleId => ({
        ...publishLocation,
        articleId,
      }));
  },
  makeLocation(token, sectionId, locale, articleId) {
    const location = {
      providerId: this.id,
      sub: token.sub,
      sectionId,
      locale,
    };
    if (articleId) {
      location.articleId = articleId;
    }
    return location;
  },
});
