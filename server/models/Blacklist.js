const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlacklistSchema = new Schema({
    token: { type: String, required: true },
    expireAt: { type: Date, required: true },
});

// Note: the background thread that deletes TTL indexes runs every 60 seconds.
BlacklistSchema.index({expireAt: 1}, {expireAfterSecond: 0});

const Blacklist = mongoose.model("Blacklist", BlacklistSchema);

module.exports = Blacklist;
