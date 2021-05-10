const { parse } = require('pg-connection-string');

const config = parse(process.env.DATABASE_URL);

// eslint-disable-next-line no-unused-vars
module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: config.host,
        port: config.port,
        database: config.database,
        username: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false
        }
      },
      options: {
        ssl: true
      }
    }
  }
});
