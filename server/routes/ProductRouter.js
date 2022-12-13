const router = require("express").Router();
const controller = require("../controllers/ProductController.js");
//const auth = require('../middleware/auth.js');


// TODO: use auth middleware to check if user is signed in
router.get('/products', controller.display_gallery);

// TODO: GET: display product page
// TODO: POST: favorite item
// TODO: DELETE: unfavortie item

module.exports = router;
