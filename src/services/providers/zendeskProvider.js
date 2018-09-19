import store from '../../store';
import zendeskHelper from './helpers/zendeskHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'zendesk',
  name: 'Zendesk',
  getToken({ sub }) {
    return store.getters['data/zendeskTokensBySub'][sub];
  },
  getLocationUrl({ sub, locale, articleId }) {
    const token = this.getToken({ sub });
    return `https://${token.subdomain}.zendesk.com/hc/${locale}/articles/${articleId}`;
  },
  getLocationDescription({ articleId }) {
    return articleId;
  },
  async publish(token, html, metadata, publishLocation) {
    const articleId = await zendeskHelper.uploadArticle({
      ...publishLocation,
      token,
      title: metadata.title,
      content: html,
      labels: metadata.tags,
      isDraft: metadata.status === 'draft',
    });
    return {
      ...publishLocation,
      articleId,
    };
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
