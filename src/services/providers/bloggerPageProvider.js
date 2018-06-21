import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'bloggerPage',
  getToken(location) {
    const token = store.getters['data/googleTokensBySub'][location.sub];
    return token && token.isBlogger ? token : null;
  },
  getUrl(location) {
    return `https://www.blogger.com/blogger.g?blogID=${location.blogId}#editor/target=page;pageID=${location.pageId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.pageId} — ${location.blogUrl} — ${token.name}`;
  },
  async publish(token, html, metadata, publishLocation) {
    const page = await googleHelper.uploadBlogger({
      token,
      blogUrl: publishLocation.blogUrl,
      blogId: publishLocation.blogId,
      postId: publishLocation.pageId,
      title: metadata.title,
      content: html,
      isPage: true,
    });
    return {
      ...publishLocation,
      blogId: page.blog.id,
      pageId: page.id,
    };
  },
  makeLocation(token, blogUrl, pageId) {
    const location = {
      providerId: this.id,
      sub: token.sub,
      blogUrl,
    };
    if (pageId) {
      location.pageId = pageId;
    }
    return location;
  },
});
