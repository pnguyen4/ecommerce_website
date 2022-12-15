const express = require('express');
const path = require('path');
const routes = require('./routes');
const cookies = require("cookie-parser");
const app = express();

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Parse requests with JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Set up EJS template engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

app.use(routes.ProductRouter);
app.use(routes.UserRouter);
app.use(routes.UIRouter);

app.all('*', (req, res) => {
    res.status(404).send(`<h1>Page not found at url: ${req.url}</h1>`);
})

module.exports = app;
