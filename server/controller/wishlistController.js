const User = require("../model/user");

//Show Wishlist

exports.wishListShow_get = async(req, res) => {

    try {
        const user = await User.findOne({ _id: req.user.userDB._id }).populate("wishList");
        res.render('wishlist.ejs', {
            wishes: user.wishList,
            user: req.user.userDB,
        });


    } catch (err) {
        console.log(err);
    }

}

exports.wishList_get = async(req, res) => {
    const productId = req.params.id;

    try {
        const user = await User.findOne({ _id: req.user.userDB._id });
        user.addWish(productId, user);
        res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}