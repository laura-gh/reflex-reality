const cloudinary = require("cloudinary");
const Passport = require("passport");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// Models
const Product = require("../models/product");
const User = require("../models/user");

// Express validator setup
const {
  check,
  body,
  validationResult
} = require("express-validator");

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Nodemailer setup
const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}));


exports.adminGet = (req, res) => {
  res.render("admin", {
    title: "Reflex-Reality | Admin"
  });
}

exports.registerGet = (req, res) => {
  res.render("register", {
    title: "Reflex-Reality | Registrácia",
    errors: false
  });
}

exports.registerPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are errors
    // res.json(req.body);
    res.render("register", {
      title: "Reflex-Reality | Errors occured",
      errors: errors.array()
    });
    return;
  } else {
    // No errors
    const newUser = new User(req.body);
    const email = req.body.email;
    const name = req.body.first_name;
    User.register(newUser, req.body.password, function (err) {
      if (err) {
        console.log("Error while registering!", err);
        return next(err);
      } else {
        transporter.sendMail({
          to: email,
          from: "reflex-reality@reflex-reality.sk",
          subject: "Úspešná registrácia!",
          html: {
            path: "public/pages/email_template.html"
          }
        })
        next(); // Move onto loginPost after registering
      }
    });
  }
}

exports.loginPost = Passport.authenticate("local", {
  successRedirect: "/",
  successFlash: "Boli ste úspešne prihlásený!",
  failureRedirect: "/admin",
  failureFlash: "Nepodarilo sa Vám prihlásiť, skúste znova!"
});

exports.logout = (req, res) => {
  req.logout();
  req.flash("info", "Boli ste úspešne odhlásený.");
  res.redirect("/");
}

exports.userGet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({
      _id: userId
    });
    res.render("user", {
      title: "Reflex-Reality | Môj profil",
      user
    });
  } catch (error) {
    next(error);
  }
}

exports.createProductGet = (req, res) => {
  res.render("new", {
    title: "Pridať novú ponuku",
    updating: false,
    deleting: false,
    errors: false
  });
}

exports.createProductPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("new", {
        title: "Pridať ponuku | Vyskytla sa chyba",
        updating: false,
        deleting: false,
        errors: errors.array()
      });
      return;
    } else {
      const str = req.body.image;
      const imgArr = str.split(",");
      console.log(imgArr);

      const strID = req.body.imageID;
      const idArr = strID.split(",");
      console.log(idArr);

      const product = new Product({
        product_category: req.body.product_category,
        product_name: req.body.product_name,
        product_name_hu: req.body.product_name_hu,
        product_detail: req.body.product_detail,
        product_detail_hu: req.body.product_detail_hu,
        product_area: req.body.product_area || null,
        product_location: req.body.product_location,
        product_location_hu: req.body.product_location_hu,
        product_price: req.body.product_price,
        product_price_hu: req.body.product_price_hu,
        imageURL: imgArr || null,
        imageID: idArr || null,
        date_of_creation: req.body.date_of_creation
      });
      await product.save();
      req.flash("success", `Ponuka '${product.product_name}' bola úspešne pridaná.`);
      res.redirect(`/all/${product.product_category}/id/${product._id}`);
    }
  } catch (error) {
    next(error);
  }
}

exports.updateProductGet = async (req, res, next) => {
  try {
    const updateMode = req.query.update;
    if (!updateMode) {
      return res.redirect("/");
    }
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.render("new", {
      title: "Upraviť ponuku",
      updating: updateMode,
      deleting: false,
      product: product,
      errors: false
    });
  } catch (error) {
    next(error);
  }
}

exports.updateProductPost = async (req, res, next) => {
  try {
    const str = req.body.image;
    const imgArr = str.split(",");
    console.log(imgArr);

    const strID = req.body.imageID;
    const idArr = strID.split(",");
    console.log(idArr);

    const productId = req.params.productId;
    const updatedCategory = req.body.product_category;
    const updatedName = req.body.product_name;
    const updatedNameHu = req.body.product_name_hu;
    const updatedDetail = req.body.product_detail;
    const updatedDetailHu = req.body.product_detail_hu;
    const updatedArea = req.body.product_area || null;
    const updatedLocation = req.body.product_location;
    const updatedLocationHu = req.body.product_location_hu;
    const updatedPrice = req.body.product_price;
    const updatedPriceHu =  req.body.product_price_hu;
    const updatedImage = imgArr || null;
    const updatedImageID = idArr || null;
    const updatedDate = req.body.date_of_creation;
    const product = await Product.findByIdAndUpdate(productId, {
      product_category: updatedCategory,
      product_name: updatedName,
      product_name_hu: updatedNameHu,
      product_detail: updatedDetail,
      product_detail_hu: updatedDetailHu,
      product_area: updatedArea,
      product_location: updatedLocation,
      product_location_hu: updatedLocationHu,
      product_price: updatedPrice,
      product_price_hu: updatedPriceHu,
      imageURL: updatedImage,
      imageID: updatedImageID,
      date_of_creation: updatedDate
    }, {
      new: true
    });
    req.flash("success", `Ponuka '${product.product_name}' bola úspešne zmenená.`);
    res.redirect(`/all/${updatedCategory}/id/${productId}`);
  } catch (error) {
    next(error);
  }
}

exports.deleteProductGet = async (req, res, next) => {
  try {
    const deleteMode = req.query.delete;
    if (!deleteMode) {
      return res.redirect("/");
    }
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.render("new", {
      title: "Vymazať ponuku",
      deleting: deleteMode,
      updating: false,
      product: product,
      errors: false
    });
  } catch (error) {
    next(error);
  }
}

exports.deleteProductPost = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByIdAndRemove(productId);
    req.flash("info", `Ponuka číslo '${productId}' bola úspešne odstránená.`);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

exports.deleteFromCloudinary = async (req, res, next) => {
  try {
    if (req.body.imageID) {
      const stringID = req.body.imageID;
      const publicIDS = stringID.split(",");
      console.log(publicIDS);

      for (let i = 0; i < publicIDS.length; i++) {
        await cloudinary.v2.uploader.destroy(publicIDS[i])
          .then(result => {
            next();
          })
          .catch(() => {
            res.redirect("/admin/add-product");
          })
      }

    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

exports.resetGet = (req, res, next) => {
  res.render("reset", {
    title: "Reflex-Reality | Zmena hesla"
  });
}

exports.resetPost = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
          req.flash("error", "Nenašiel sa účet k uvedenej e-mailovej adrese.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "reflex-reality@reflex-reality.sk",
          subject: "Žiadosť o zmenu hesla",
          html: `
          <p>Vážený klient, <br> Zaznamenali sme Vašu požiadavku o zmenu hesla. <br> Kliknite na nasledovný odkaz: <a href="http://localhost:3000/reset/${token}">LINK</a></p>
          `
        });
      })
      .catch(err => {
        return next(error);
      });
  });
}

exports.newPasswordGet = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
      resetToken: token,
      resetTokenExpiration: {
        $gt: Date.now()
      }
    })
    .then(user => {
      res.render("new_password", {
        title: "Reflex-Reality | Zmena hesla",
        userId: user._id.toString(),
        passwordToken: token
      });
    })
    .catch(err => {
      return next(error);
    });
}

exports.newPasswordPost = (req, res, next) => {
  const newPassword = req.body.newPassword;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: {
        $gt: Date.now()
      },
      _id: userId
    })
    .then(user => {
      console.log(user);
      console.log(userId);
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      return user.save();
    })
    .then(result => {
      console.log(result);
      res.redirect("/admin")
    })
    .catch(error => {
      next(error);
    })
}

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
    return;
  }
  res.redirect("/");
}