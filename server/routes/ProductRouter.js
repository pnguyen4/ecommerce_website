const router = require("express").Router();
const controller = require("../controllers/ProductController.js");
const auth = require('../middleware/auth.js');

// TODO: use auth middleware to check if user is signed in
router.get('/products',
           auth.optional_token,
           controller.display_gallery);

router.get('/products/details/:productId',
           auth.optional_token,
           controller.display_product);

router.put('/products/details/:productId',
           auth.requires_token,
           controller.add_favorite_product);

module.exports = router;
