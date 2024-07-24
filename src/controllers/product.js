"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
const Product = require("../models/product");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "List Products"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    const products = await res.getModelList(Product, {}, [
      "categoryId",
      "brandId",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Product),
      totalRecords: products.length,
      products,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Create Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Product 1"
                }
            }
        */

    const newProduct = await Product.create(req.body);

    res.status(201).send({
      error: false,
      newProduct,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Get Single Product"
        */

    console.log("read run");

    if (req.params.id) {
      // Single

      const product = await Product.findOne({ _id: req.params.id }).populate([
        "categoryId",
        "brandId",
      ]);

      res.status(200).send({
        error: false,
        product,
      });
    } else {
      // All

      const products = await res.getModelList(Product, {}, [
        "categoryId",
        "brandId",
      ]);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Product),
        totalRecords: products.length,

        products,
      });
    }
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Products"]
            #swagger.summary = "Update Product"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Product 1"
                }
            }
        */

    const product = await Product.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      newProduct: await Product.findOne({ _id: req.params.id }),
      product,
    });
  },

  delete: async (req, res) => {},
};
