import store from '../../store';
import googleHelper from './helpers/googleHelper';
import Provider from './common/Provider';

export default new Provider({
  id: 'bloggerPage',
  name: 'Blogger Page',
  getToken({ sub }) {
    const token = store.getters['data/googleTokensBySub'][sub];
    return token && token.isBlogger ? token : null;
  },
  getLocationUrl({ blogId, pageId }) {
    return `https://www.blogger.com/blogger.g?blogID=${blogId}#editor/target=page;pageID=${pageId}`;
  },
  getLocationDescription({ pageId }) {
    return pageId;
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
