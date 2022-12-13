const Product = require("../models/Product");
const items_per_page = 9;

exports.display_gallery = async (req, res) => {
    let page = (req.query.page ?? 1) - 1;
    if (page < 0) page = 1;

    const filter = {};
    filter.brand = req.query.brand ?
        { "$in": [req.query.brand].flat() } : {"$exists": true};
    filter.product_type = req.query.type ?
        { "$in": [req.query.type].flat() } : {"$exists": true};

    try {
        // TODO: if auth passes, use req.user to get favorites list and pass on to view if so
        const favorites = {};

        const products = await Product.aggregate([
            { "$match": filter },
            { "$skip": page * items_per_page },
            { "$limit": items_per_page }
        ]);

        res.status(200).send(products);
    } catch (error) {
        res.status(404).json({error});
    }
};
