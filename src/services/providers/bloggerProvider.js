import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerRegistry from './providerRegistry';

export default providerRegistry.register({
  id: 'blogger',
  getToken(location) {
    const token = store.getters['data/googleTokens'][location.sub];
    return token && token.isBlogger ? token : null;
  },
  getUrl(location) {
    return `https://www.blogger.com/blogger.g?blogID=${location.blogId}#editor/target=post;postID=${location.postId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.postId} — ${location.blogUrl} — ${token.name}`;
  },
  publish(token, html, metadata, publishLocation) {
    return googleHelper.uploadBlogger(
      token,
      publishLocation.blogUrl,
      publishLocation.blogId,
      publishLocation.postId,
      metadata.title,
      html,
      metadata.tags,
      metadata.status === 'draft',
      metadata.date,
    )
      .then(post => ({
        ...publishLocation,
        blogId: post.blog.id,
        postId: post.id,
      }));
  },
  makeLocation(token, blogUrl, postId) {
    const location = {
      providerId: this.id,
      sub: token.sub,
      blogUrl,
    };
    if (postId) {
      location.postId = postId;
    }
    return location;
  },
});
