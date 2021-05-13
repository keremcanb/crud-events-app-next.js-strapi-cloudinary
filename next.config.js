module.exports = {
  future: {
    webpack5: true
  },
  images: {
    domains: ['res.cloudinary.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://next-events.herokuapp.com/:path*'
      }
    ];
  }
};
