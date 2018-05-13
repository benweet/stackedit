import store from '../../store';
import wordpressHelper from './helpers/wordpressHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'wordpress',
  getToken(location) {
    return store.getters['data/wordpressTokens'][location.sub];
  },
  getUrl(location) {
    return `https://wordpress.com/post/${location.siteId}/${location.postId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.postId} — ${location.domain} — ${token.name}`;
  },
  async publish(token, html, metadata, publishLocation) {
    const post = await wordpressHelper.uploadPost({
      ...publishLocation,
      ...metadata,
      token,
      content: html,
    });
    return {
      ...publishLocation,
      siteId: `${post.site_ID}`,
      postId: `${post.ID}`,
    };
  },
  makeLocation(token, domain, postId) {
    const location = {
      providerId: this.id,
      sub: token.sub,
      domain,
    };
    if (postId) {
      location.postId = postId;
    }
    return location;
  },
});
