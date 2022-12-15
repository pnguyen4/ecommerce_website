const Product = require("../models/Product");
const items_per_page = 9;

exports.display_gallery = async (req, res) => {
    try {
        let page = (req.query.page ?? 1) - 1;
        if (page < 0) page = 0;

        const filter = {
            brand: req.query.brand ?
                { "$in": [req.query.brand].flat() } : {"$exists": true},
            product_type: req.query.type ?
                { "$in": [req.query.type].flat() } : {"$exists": true}
        };

        // TODO: if auth passes, use req.user to get favorites list and pass on to view if so
        const favorites = {};

        const products = await Product.find(filter)
                                      .skip(page * items_per_page)
                                      .limit(items_per_page);

        if (products.length > 0) res.render('main', {products, req});
        else res.render('main', {products: undefined, req})
        //res.status(200).send(products);
    } catch (error) {
        res.status(404).json({error});
    }
};

exports.display_product = async (req, res) => {
    try {
        const id = req.params.productId;
        if (!(id && id.match(/^[0-9a-fA-F]{24}$/))) throw("not a valid product uri.");

        const product = await Product.findById(id);
        if (!product) throw("product could not be found");

        //res.status(200).send(product);
        res.render('product_page', {product, req});
    } catch (error) {
        //res.status(404).json({error});
        res.render('product_page', {product: undefined, req, error});
    }
};
