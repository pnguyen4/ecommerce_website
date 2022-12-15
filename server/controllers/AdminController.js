const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });

const { User, validate } = require("../models/User");

exports.admin_portal = async (req, res) => {
    const users = await User.find({ isAdmin: { $not: { $eq: true } } })
                            .populate('favorites');

    res.render('admin_page', {users, req});
};
