"use strict";

// External Dependancies
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const walletSchema = new mongoose.Schema({ address: "string" });
const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    country: { type: String, required: true },
    wallets: [walletSchema],
    isKycApproved: { type: Boolean, default: false },
    kycDoc: {
      provider: { type: String, default: "" },
      hash: { type: String, default: "" }
    }
  },
  {
    timestamps: true
  }
);
profileSchema.index({ userId: 1 }, { unique: true });
profileSchema.plugin(uniqueValidator);

profileSchema.methods = {
  updateWallet: async function(userId, wallet) {
    const Profile = mongoose.model("profile");
    const options = { userId };
    const profileDoc = await Profile.findOneAndUpdate(
      options,
      { $set: { wallets: { address: wallet } } },
      { upsert: true, new: true }
    );
    return JSON.stringify(profileDoc);
  },
  isDuplicateWallet: async function(walletAddress) {
    const Profile = mongoose.model("profile");
    const options = { "wallets.address": walletAddress };
    return await Profile.find(options).limit(1);
  }
};

module.exports = mongoose.model("profile", profileSchema);
