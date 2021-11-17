const DOMAIN = 'http://hussle.webapricot.am/api/auth';

export const environment = {
  domain: DOMAIN,
  apiUrl: `${DOMAIN}`,
  production: true,
  pusher: {
    key: '1234',
    cluster: 'mt1',
  },
};
