const router = require("express").Router();
const controller = require("../controllers/ProductController.js");
const auth = require('../middleware/auth.js');

router.get('/products',
           auth.optional_token,
           controller.display_gallery);

router.get('/products/details/:productId',
           auth.optional_token,
           controller.display_product);

router.put('/products/details/:productId',
           auth.requires_token,
           controller.add_favorite_product);

router.delete('/products/details/:productId',
              auth.requires_token,
              controller.delete_favorite_product);

module.exports = router;
