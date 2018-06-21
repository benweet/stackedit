import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'blogger',
  getToken(location) {
    const token = store.getters['data/googleTokensBySub'][location.sub];
    return token && token.isBlogger ? token : null;
  },
  getUrl(location) {
    return `https://www.blogger.com/blogger.g?blogID=${location.blogId}#editor/target=post;postID=${location.postId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.postId} — ${location.blogUrl} — ${token.name}`;
  },
  async publish(token, html, metadata, publishLocation) {
    const post = await googleHelper.uploadBlogger({
      ...publishLocation,
      token,
      title: metadata.title,
      content: html,
      labels: metadata.tags,
      isDraft: metadata.status === 'draft',
      published: metadata.date,
    });
    return {
      ...publishLocation,
      blogId: post.blog.id,
      postId: post.id,
    };
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
