const router = require("express").Router();

router.get('/', (req, res) => res.redirect('/products'));
router.get('/user/signup', (req, res) => res.render('signup_page'));
router.get('/user/login', (req, res) => res.render('login_page'));

module.exports = router;
