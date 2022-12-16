const path = require("path");
const bcrypt = require('bcryptjs');
require('dotenv').config(path.join(__dirname, '../.env')); // .env is in different folder
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

const { User } = require('../models/User');
const Product = require('../models/Product');

const randInt = upper_bound => Math.floor(Math.random() * upper_bound); // exclusive upper
const lorem_ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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

        const brands = [1, 2, 3, 4, 5, 6].map(x => `brand${x}`);
        const types = ["type1", "type2", "type3"];
        const sample_products = [];
        for (let i = 0; i < 30; ++i) {
            sample_products.push({
                name: `item${i}`,
                description: lorem_ipsum,
                quantity: randInt(100),
                price: parseFloat(`${randInt(100)}.${randInt(100)}`),
                brand: brands[i % 6],
                product_type: [types[randInt(3)], types[randInt(3)]],
            });
        }

        await User.create([user, admin]);
        await Product.create(sample_products);
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.connection.close();
    }
}

run().catch(console.dir)
