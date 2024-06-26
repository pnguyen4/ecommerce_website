const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const refType = mongoose.Types.ObjectId;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, // will be securely hashed
    //favorites: {type: [refType], default: []},
    favorites: [{type: refType, ref: 'Product'}],
    isAdmin: {type: Boolean, required: true, default: false}
});

const validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(2).max(12).required(),
        email: Joi.string().email().min(4).max(50).required(),
        password: Joi.string()
                     .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        isAdmin: Joi.boolean().sensitive(),
        favorties: Joi.array()
    });
    return schema.validate(user);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User, validate };
