const dev = {
  app: {
    port: process.env.PORT,
  },
  db: {
    host: process.env.DEV_APP_HOST,
    port: process.env.DEV_APP_PORT,
    name: process.env.DEV_APP_NAME,
  },
};
const pro = {
  app: {
    port: process.env.PORT_PRO,
  },
  db: {
    host: process.env.PRO_APP_HOST,
    port: process.env.PRO_APP_PORT,
    name: process.env.PRO_APP_NAME,
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
