const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
    referrer: String,
    referredUser: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Referral", ReferralSchema);
