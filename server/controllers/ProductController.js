const Product = require("../models/Product");
const { User } = require("../models/User");
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

        let favorites = [];
        // will only exist if user has token and is token valid
        if (req.user) {
            const query = await User.findById(req.user._id, 'favorites -_id')
                                    .populate('favorites');
            console.log(`user favorites list: ${query.favorites}`)
            favorites = query.favorites;
        }

        const products = await Product.find(filter)
                                      .skip(page * items_per_page)
                                      .limit(items_per_page);

        if (products.length > 0) res.render('main', {products, favorites, req});
        else res.render('main', {products: undefined, favorites, req})
        //res.status(200).send(products);
    } catch (error) {
        res.status(404).json({error});
    }
};

exports.display_product = async (req, res) => {
    try {
        const id = req.params.productId;
        if (!(id && id.match(/^[0-9a-fA-F]{24}$/))) throw("not a valid product uri.");

        let favorited = false;
        // will only exist if user has token and is token valid
        if (req.user) {
            const query = await User.find({ _id : req.user._id,
                                            favorites: req.params.productId });
            favorited = query.length > 0 ? true : false;
         }

        const product = await Product.findById(id);
        if (!product) throw("product could not be found");

        //res.status(200).send(product);
        res.render('product_page', {product, favorited, req});
    } catch (error) {
        //res.status(404).json({error});
        res.render('product_page', {product: undefined, req, error});
    }
};

exports.add_favorite_product = async (req, res) => {
    try {
        // should be idempotent
        const query = await User.updateOne({ _id: req.user._id },
                                           { "$addToSet":
                                             { favorites: req.params.productId } });
        //console.log(`confirm add favorite item: ${JSON.stringify(query)}`);
        res.status(200).json(query);
    } catch (error) {
        res.status(422).json(error);
    }
};
