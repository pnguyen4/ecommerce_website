const router = require("express").Router();
const controller = require("../controllers/UserController.js");
const auth = require('../middleware/auth.js');

router.post('/user/signup', controller.signup_user);
router.post('/user/login', controller.login_user);
router.post('/user/logout', auth.requires_token, controller.logout_user);

// TODO: POST: favorite item
// TODO: DELETE: unfavortie item

module.exports = router;
