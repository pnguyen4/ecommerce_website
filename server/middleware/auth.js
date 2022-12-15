const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({ path: path.join(__dirname, '../.env') });
const Blacklist = require("../models/Blacklist");

exports.requires_token = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send({msg: "User not signed in."});
    }

    const query = await Blacklist.findOne({token: token}) ?? "";
    if (query.token == token) {
        return res.status(401).send({msg: "Blacklisted Token. User already signed out."});
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.status(401).send(`<h1>INVALID AUTH TOKEN: ${err}</h1>`);
        } else {
            req.user = payload;
            next();
        }
    });
}

exports.optional_token = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next();
    }

    const query = await Blacklist.findOne({token: token}) ?? "";
    if (query.token == token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            next();
        } else {
            req.user = payload;
            next();
        }
    });
};
