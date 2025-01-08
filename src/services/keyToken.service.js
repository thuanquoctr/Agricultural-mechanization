'use strict';

const keyTokenModel = require('../models/keyToken.model');

class keyTokenService {
  //create keyToKen
  static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const tokens = await keyTokenModel.create({ user: userId, publicKey: publicKeyString });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}
module.exports = keyTokenService;
