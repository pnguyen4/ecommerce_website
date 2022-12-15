const router = require("express").Router();
const controller = require("../controllers/AdminController.js");
const auth = require('../middleware/auth.js');

router.get('/', auth.optional_token, (req, res) => {
    if (req.user && req.user.isAdmin) controller.admin_portal(req, res);
    else return res.redirect('/products');
});

router.get('/user/signup',
           auth.optional_token,
           (req, res) => res.render('signup_page'));

router.get('/user/login',
           auth.optional_token,
           (req, res) => res.render('login_page'));

module.exports = router;
