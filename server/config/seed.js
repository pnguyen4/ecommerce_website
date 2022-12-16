const path = require("path");
const bcrypt = require('bcryptjs');
require('dotenv').config(path.join(__dirname, '../.env')); // .env is in different folder
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

const { laptops: products } = require('./products.json');
const { User } = require('../models/User');
const Product = require('../models/Product');

const randInt = upper_bound => Math.floor(Math.random() * upper_bound); // exclusive upper

async function run() {
    try {
        mongoose.connect(MONGO_URL);
        console.log("Connected to the DB.");

        // Reset Database
        await User.collection.drop();
        await Product.collection.drop();

        const user = {
            username: "user",
            email: "user@gmail.com",
            password: await bcrypt.hash('Password123!', Number(process.env.SALT)),
            favorites: [],
            isAdmin: false
        };
        const admin = {
            username: "admin",
            email: "admin@gmail.com",
            password: await bcrypt.hash('Password123!', Number(process.env.SALT)),
            favorites: [],
            isAdmin: true
        };

        console.log(products.length)
        for (let product of products) {
            product.quantity = randInt(100);
            product.image_uri = `/public/images/${product.name}.jpg`;
        }

        await User.create([user, admin]);
        await Product.create(products);
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
}

run().catch(console.dir)
