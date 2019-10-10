"use strict";

// External Dependancies
const boom = require("boom");
const _ = require("lodash/core");

// Get Data Models
const Profile = require("../models/Profile");

// Add a new profile
exports.addProfile = async (req, reply) => {
  // req.log.warn('Some info about the current request')
  try {
    const profile = new Profile({
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      wallets: [{ address: req.body.wallets }]
    });
    console.log(Profile);
    return profile.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getProfile = async (req, reply) => {
  // req.log.warn('Some info about the current request')
  const profileId = req.params.userId;
  try {
    const profile = await Profile.find(
      { userId: profileId },
      { _id: 0, __v: 0 }
    ).limit(1);
    if (_.isEmpty(profile)) {
      reply.code(400).send("No such user found");
    } else {
      reply.send(JSON.stringify(profile[0]));
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.updateWallet = async (req, reply) => {
  // req.log.warn('Some info about the current request')
  const userId = req.body.userId;
  const wallet = req.body.wallet;
  const profileModel = new Profile();
  try {
    const profile = await profileModel.updateWallet(userId, wallet);
    return profile;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.isDuplicateWallet = async (req, reply) => {
  const walletAddress = req.params.walletAddress;
  const profileModel = new Profile();
  try {
    const profile = await profileModel.isDuplicateWallet(walletAddress);
    if (_.isEmpty(profile)) {
      reply.send({ message: "Good to go!" });
    } else {
      reply.code(400).send({ message: "Wallet already in database" });
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
