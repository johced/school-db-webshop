const User = require('../model/user');

// show wish list
exports.wishListShow_get = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userDB._id }).populate('wishList');
    // user.addWish(user);
    res.render('wishlist.ejs', {
      wishes: user.wishList,
      user: req.user.userDB,
    });
    // console.log(user);
  } catch (err) {
    console.log(err);
  }
};

exports.wishList_get = async (req, res) => {
  const productId = req.params.id;

  try {
    const user = await User.findOne({ _id: req.user.userDB._id });
    //  console.log(user);
    user.addWish(productId, user);

    res.redirect('back');
    // console.log(user.wishList);
  } catch (err) {
    console.log(err);
  }
};
