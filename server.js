const app = require('./src/app');
const {
  app: { port },
} = require('./src/configs/config.mongodb');
const server = app.listen(port, () => {
  console.log(`Web service Agricultural mechanization start ${port}`);
});
