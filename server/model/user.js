const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255,
    },
    cryptoUrl: {
        type: String,
    },
    cryptoUrlExpiration: {
        type: Date,
    },
    role: {
        type: String,
    },
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }, ],
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }, ],
});

userSchema.methods.addProduct = async function(productId) {
    this.productList.push(productId);
    await this.save();
};

userSchema.methods.addWish = async function(wishId, user) {
    for (i = 0; i < user.wishList.length; i++) {

        if (user.wishList[i] == wishId) return;

    }
    this.wishList.push(wishId);
    await this.save();

}

const User = mongoose.model('user', userSchema);

module.exports = User;