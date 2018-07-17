import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'blogger',
  name: 'Blogger',
  getToken({ sub }) {
    const token = store.getters['data/googleTokensBySub'][sub];
    return token && token.isBlogger ? token : null;
  },
  getLocationUrl({ blogId, postId }) {
    return `https://www.blogger.com/blogger.g?blogID=${blogId}#editor/target=post;postID=${postId}`;
  },
  getLocationDescription({ postId }) {
    return postId;
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
