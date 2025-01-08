'use strict';
const {
  db: { host, name, port },
} = require('../configs/config.mongodb');
const mongoose = require('mongoose');
const connectString = `mongodb://${host}:${port}/${name}`;
// check number connection my mongodb
const { countConnect } = require('../helpers/check.connect');
// create only one connect , if exist just get and use
class Database {
  constructor() {
    this.connect();
  }
  //connect
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    mongoose
      .connect(connectString)
      .then((_) => {
        console.log(`Connected Mongodb Success`, countConnect());
      })
      .catch((err) => console.log(`Err Connect`));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
