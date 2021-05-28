const cookie = require('cookie');

// eslint-disable-next-line import/prefer-default-export
export const parseCookies = (req) => cookie.parse(req ? req.headers.cookie || '' : '');
