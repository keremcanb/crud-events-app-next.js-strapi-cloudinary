const { i18n } = require('./next-i18next.config');

module.exports = {
  // future: {
  //   webpack5: true
  // },
  images: {
    domains: ['res.cloudinary.com']
  },
  typescript: {
    ignoreBuildErrors: true
  },
  i18n
};
