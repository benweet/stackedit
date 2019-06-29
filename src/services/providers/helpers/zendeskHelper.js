import networkSvc from '../../networkSvc';
import store from '../../../store';
import badgeSvc from '../../badgeSvc';

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${token.accessToken}`,
  },
})
  .then(res => res.body);


export default {
  /**
   * https://support.zendesk.com/hc/en-us/articles/203663836-Using-OAuth-authentication-with-your-application
   */
  async startOauth2(subdomain, clientId, sub = null, silent = false) {
    // Get an OAuth2 code
    const { accessToken } = await networkSvc.startOauth2(
      `https://${subdomain}.zendesk.com/oauth/authorizations/new`,
      {
        client_id: clientId,
        response_type: 'token',
        scope: 'read hc:write',
      },
      silent,
    );

    // Call the user info endpoint
    const { user } = await request({ accessToken }, {
      url: `https://${subdomain}.zendesk.com/api/v2/users/me.json`,
    });
    const uniqueSub = `${subdomain}/${user.id}`;

    // Check the returned sub consistency
    if (sub && uniqueSub !== sub) {
      throw new Error('Zendesk account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      accessToken,
      name: user.name,
      subdomain,
      sub: uniqueSub,
    };

    // Add token to zendesk tokens
    store.dispatch('data/addZendeskToken', token);
    return token;
  },
  async addAccount(subdomain, clientId) {
    const token = await this.startOauth2(subdomain, clientId);
    badgeSvc.addBadge('addZendeskAccount');
    return token;
  },

  /**
   * https://developer.zendesk.com/rest_api/docs/help_center/articles
   */
  async uploadArticle({
    token,
    sectionId,
    articleId,
    title,
    content,
    labels,
    locale,
    isDraft,
  }) {
    const article = {
      title,
      body: content,
      locale,
      draft: isDraft,
    };

    if (articleId) {
      // Update article
      await request(token, {
        method: 'PUT',
        url: `https://${token.subdomain}.zendesk.com/api/v2/help_center/articles/${articleId}/translations/${locale}.json`,
        body: { translation: article },
      });

      // Add labels
      if (labels) {
        await request(token, {
          method: 'PUT',
          url: `https://${token.subdomain}.zendesk.com/api/v2/help_center/articles/${articleId}.json`,
          body: {
            article: {
              label_names: labels,
            },
          },
        });
      }
      return articleId;
    }

    // Create new article
    if (labels) {
      article.label_names = labels;
    }
    const body = await request(token, {
      method: 'POST',
      url: `https://${token.subdomain}.zendesk.com/api/v2/help_center/sections/${sectionId}/articles.json`,
      body: { article },
    });
    return `${body.article.id}`;
  },
};
