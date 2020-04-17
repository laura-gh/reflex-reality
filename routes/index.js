const express = require('express');
const router = express.Router();
const User = require("../models/user");

// Express validator setup
const { check } = require("express-validator");

const adminController = require("../controllers/adminController");
const productController = require("../controllers/productController");

/* GET home page. */
router.get('/', productController.indexGet);

// GET category page
router.get("/all/:category", productController.categoryGet);

// GET single product page
router.get("/all/:category/id/:productId", productController.productDetail);

// GET contact page
router.get("/contact", productController.contact); 

// POST search results
router.post("/search-results", productController.searchResults);

// ADMIN routes
// Registering & logging in/out
router.get("/admin", adminController.adminGet);
router.post("/admin", adminController.loginPost);

router.get("/register", adminController.registerGet);
router.post("/register", [
  check("first_name").isLength({min: 1})
  .withMessage("Je nutné zadať meno."),

  check("email").isEmail().withMessage("Zadajte platnú e-mailovú adresu.")
  .custom((value, {req}) => {
    return User.findOne({email: value})        
    .then(userDoc => {
      if (userDoc) {
        return Promise.reject(
          "Táto e-mailová adresa je už registrovaná, zvoľte si inú."
        );
      }
    })
  }),

  check("password")
  .isLength({min: 5})
  .withMessage("Heslo by malo mať minimálne 5 znakov.")  
  .trim(),

  check("confirm_password")    
  .trim()
  .custom(( value, {req} ) => value === req.body.password)
  .withMessage("Heslá sa musia zhodovať.")
  ],
  adminController.registerPost,
  adminController.loginPost
);
router.get("/logout", adminController.logout);

// User profile
router.get("/users/:userId", adminController.userGet);

// Resetting password
router.get("/reset", adminController.resetGet);
router.post("/reset", adminController.resetPost);
router.get("/reset/:token", adminController.newPasswordGet);
router.post("/new-password", adminController.newPasswordPost);


// Protecting admin routes
router.get("/admin/*", adminController.isAdmin);

// Adding, updating, deleting product
router.get("/admin/add-product", adminController.createProductGet);
router.post("/admin/add-product", [
  check("product_name")
  .isString()
  .isLength({min: 3})
  .withMessage("Je nutné zadať názov produktu.")
  .trim(),

  check("product_name_hu")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'HU - A kínálat megnevezése' musí obsahovať aspoň 3 znaky.")
  .trim(),

  check("product_detail")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'SK - Popis produktu' nemôže zostať prázdna.")
  .trim(),

  check("product_detail_hu")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'HU - Az ingatlan pontos leírása' musí obsahovať aspoň 3 znaky.")
  .trim(),

  check("product_location")
  .isString()
  .isLength({min: 1})
  .withMessage("Položka 'SK - Lokalita' nemôže zostať prázdna.")
  .trim(),

  check("product_location_hu")
  .isString()
  .isLength({min: 1})
  .withMessage("Položka 'HU - Helyszín' nemôže zostať prázdna.")
  .trim(),

  check("product_price")
  .isLength({min: 1})
  .withMessage("Je nutné zadať cenu nehnuteľnosti."),

  check("product_price_hu")
  .isLength({min: 1})
  .withMessage("Položka 'HU - Ár' nemôže zostať prázdna.")],
  adminController.createProductPost);

router.get("/admin/:productId/update-product", adminController.updateProductGet);
router.post("/admin/:productId/update-product", [
  check("product_name")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'SK - Názov ponuky' musí obsahovať aspoň 3 znaky.")
  .trim(),

  check("product_name_hu")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'HU - A kínálat megnevezése' musí obsahovať aspoň 3 znaky.")
  .trim(),

  check("product_detail")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'SK - Popis nehnuteľnosti' musí obsahovať aspoň 3 znaky.")
  .trim(),

  check("product_detail_hu")
  .isString()
  .isLength({min: 3})
  .withMessage("Položka 'HU - Az ingatlan pontos leírása' musí obsahovať aspoň 3 znaky.")
  .trim(),

  check("product_location")
  .isString()
  .isLength({min: 1})
  .withMessage("Položka 'SK - Lokalita' nemôže zostať prázdna.")
  .trim(),

  check("product_location_hu")
  .isString()
  .isLength({min: 1})
  .withMessage("Položka 'HU - Helyszín' nemôže zostať prázdna.")
  .trim(),

  check("product_price")
  .isLength({min: 1})
  .withMessage("Je nutné zadať cenu nehnuteľnosti."),

  check("product_price_hu")
  .isLength({min: 1})
  .withMessage("Položka 'HU - Ár' nemôže zostať prázdna.")],adminController.updateProductPost);

router.get("/admin/:productId/delete-product", adminController.deleteProductGet);
router.post("/admin/:productId/delete-product", 
adminController.deleteFromCloudinary,
adminController.deleteProductPost);


// Language routes
router.get("/lang=hu", productController.indexGet);
router.get("/all/:category/:lang", productController.categoryGet);
router.get("/all/:category/id/:productId/:lang", productController.productDetail);
router.get("/contact/:lang", productController.contact);
router.post("/search-results/lang=hu", productController.searchResults);

module.exports = router;
