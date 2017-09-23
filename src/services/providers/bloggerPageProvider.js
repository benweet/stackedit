import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerRegistry from './providerRegistry';

export default providerRegistry.register({
  id: 'bloggerPage',
  getToken(location) {
    const token = store.getters['data/googleTokens'][location.sub];
    return token && token.isBlogger ? token : null;
  },
  getUrl(location) {
    return `https://www.blogger.com/blogger.g?blogID=${location.blogId}#editor/target=page;pageID=${location.pageId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.pageId} — ${location.blogUrl} — ${token.name}`;
  },
  publish(token, html, metadata, publishLocation) {
    return googleHelper.uploadBlogger(
      token,
      publishLocation.blogUrl,
      publishLocation.blogId,
      publishLocation.pageId,
      metadata.title,
      html,
      null,
      null,
      null,
      true,
    )
      .then(page => ({
        ...publishLocation,
        blogId: page.blog.id,
        pageId: page.id,
      }));
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
