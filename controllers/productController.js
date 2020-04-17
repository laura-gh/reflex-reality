const Product = require("../models/product");
const querystring = require("querystring");

exports.indexGet = async (req, res, next) => {
  try {
    const lang = req.params.lang;
    const langData = querystring.parse(lang);
    const indexProducts = await Product.aggregate([{
      $sample: {
        size: 8
      }
    }]);
    res.render("index", {
      title: "Reflex-Reality | Domov",
      indexProducts,
      langData
    });
  } catch (error) {
    next(error);
  }
}

exports.categoryGet = async (req, res, next) => {
  try {
    const lang = req.params.lang || null;
    const langData = querystring.parse(lang) || null;
    const categoryParam = req.params.category;
    const categoryProducts = await Product.aggregate([{
      $match: {
        product_category: categoryParam
      }},
      { 
        $sort: {
          date_of_creation: -1
      }
    }]);
    res.render("category", {
      title: "Reflex-Reality",
      categoryProducts,
      langData
    })
  } catch (error) {
    next(error);
  }
}

exports.productDetail = async (req, res, next) => {
  try {
    const lang = req.params.lang || null;
    const langData = querystring.parse(lang) || null;
    const categoryParam = req.params.category;
    const productParam = req.params.productId;
    const product = await Product.findById(productParam);
    res.render("product", {
      title: product.product_name,
      product: product,
      langData
    });
  } catch (error) {
    next(error);
  }
}

exports.contact = (req, res, next) => {
  const lang = req.params.lang || null;
  const langData = querystring.parse(lang) || null;
  res.render("contact", {
    title: "Reflex-Reality | Kontakt",
    langData
  });
}

exports.searchResults = async (req, res, next) => {
  try {
    const searchQuery = req.body;
    const searchProducts = await Product.aggregate([{
      $match: {
        $text: {
          $search: `${searchQuery.search}`,
          $caseSensitive: false,
          $diacriticSensitive: false
        }
      }
    }]);
    res.render("search_results", {
      title: "Reflex-Reality | Výsledky hľadania",
      searchProducts
    })
  } catch (error) {
    next(error);
  }
}