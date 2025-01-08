'use strict';
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;
//count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  // console.log(`Number of conections:: ${numConnection}`);
  return numConnection;
};
// check overload connect
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCore = os.cpus;
    const memoryUse = process.memoryUsage().rss;
    // Example Maximum number of connections based on number osf cores
    const maxConnections = numCore * 5;
    console.log(`Active connections: ${numConnection}`);

    console.log(`Memory usage:${memoryUse / 1024 / 1024} MB`);

    if (numConnection > maxConnections) {
      console.log(`Connection overload detected`);
    }
  }, _SECOND); // Monitor every 5 second
};
module.exports = { countConnect, checkOverload };
