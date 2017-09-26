import store from '../../store';
import wordpressHelper from './helpers/wordpressHelper';
import providerRegistry from './providerRegistry';

export default providerRegistry.register({
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
  publish(token, html, metadata, publishLocation) {
    return wordpressHelper.uploadPost(
      token,
      publishLocation.domain,
      publishLocation.siteId,
      publishLocation.postId,
      metadata.title,
      html,
      metadata.tags,
      metadata.categories,
      metadata.excerpt,
      metadata.author,
      metadata.featuredImage,
      metadata.status,
      metadata.date,
    )
      .then(post => ({
        ...publishLocation,
        siteId: `${post.site_ID}`,
        postId: `${post.ID}`,
      }));
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
