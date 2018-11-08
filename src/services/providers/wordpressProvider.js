import store from '../../store';
import wordpressHelper from './helpers/wordpressHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'wordpress',
  name: 'WordPress',
  getToken({ sub }) {
    return store.getters['data/wordpressTokensBySub'][sub];
  },
  getLocationUrl({ siteId, postId }) {
    return `https://wordpress.com/post/${siteId}/${postId}`;
  },
  getLocationDescription({ postId }) {
    return postId;
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
