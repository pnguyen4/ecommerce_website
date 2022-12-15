const router = require("express").Router();
const controller = require("../controllers/ProductController.js");
//const auth = require('../middleware/auth.js');

// TODO: use auth middleware to check if user is signed in
router.get('/products', controller.display_gallery);
router.get('/products/details/:productId', controller.display_product);

module.exports = router;
