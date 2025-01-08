'use strict';
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const Role = {
  USER: 'User',
  STAFF: 'Staff',
  ADMIN: 'Admin',
};
class AccessService {
  //create account
  static signUp = async ({ name, email, password }) => {
    try {
      const hoderUser = await userModel.findOne({ email }).lean();
      //return when user registered
      if (hoderUser) {
        return { code: 200, message: `User alrealy registered` };
      }
      // hash password before insert
      const passwordHash = await bcrypt.hash(password, 10);
      //create user
      const newUser = await userModel.create({
        name,
        email,
        password: passwordHash,
        roles: [Role.USER],
      });
      //create privateKey,publicKey
      if (newUser) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });
        const publicKeyString = await keyTokenService.createKeyToken({
          userId: newUser._id,
          publicKey,
        });
        if (!publicKeyString) {
          return { code: 'xxxx', message: `publicKeyString error` };
        }
        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        //create tokenPair
        const tokens = await createTokenPair(
          { userId: newUser._id, email },
          publicKeyObject,
          privateKey
        );
        console.log(`Created token Success::`, tokens);
        return {
          code: 201,
          metadata: {
            user: getInfoData({ fields: ['_id', 'email'], object: newUser }),
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return error;
    }
  };
}
module.exports = AccessService;
