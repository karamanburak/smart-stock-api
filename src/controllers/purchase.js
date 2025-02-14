"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
const Purchase = require("../models/purchase");
const Product = require("../models/product");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "List Purchases"
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
    const purchases = await res.getModelList(Purchase, {}, [
      { path: "userId", select: "username email" },
      { path: "firmId", select: "name image" },
      "brandId",
      { path: "productId", select: "productId name categoryId" },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelsListDetails(Purchase),
      totalRecords: purchases.length,
      purchases,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Create Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Purchase 1"
                }
            }
        */
    // userId verisini req.user'dan al
    req.body.userId = req.user._id;

    // Create

    const newPurchase = await Purchase.create(req.body);

    // Satınalma sonrası quantity bilgisini göncelle yani artış olmalı
    const updateProduct = await Product.updateOne(
      { _id: data.productId },
      { $inc: { quantity: +data.quantity } }
    );

    res.status(201).send({
      error: false,
      newPurchase,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Get Single Purchase"
        */

    console.log("read run");

    if (req.params.id) {
      // Single

      const purchase = await Purchase.findOne({ _id: req.params.id }).populate([
        { path: "userId", select: "username email" },
        { path: "firmId", select: "name image" },
        "brandId",
        { path: "productId", select: "productId name categoryId" },
      ]);

      res.status(200).send({
        error: false,
        purchase,
      });
    } else {
      // All

      const purchase = await res.getModelList(Purchase, {}, [
        { path: "userId", select: "username email" },
        { path: "firmId", select: "name image" },
        "brandId",
        { path: "productId", select: "productId name categoryId" },
      ]);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Purchase),
        purchase,
      });
    }
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Update Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Purchase 1"
                }
            }
        */
    if (req.body?.quantity) {
      // mevcut adet bilgisini al:
      const currentPurchase = await Purchase.findOne({ _id: req.params.id });
      // farkı bul:
      const difference = req.body.quantity - currentPurchase.quantity;
      // farkı Product'a güncelle
      const updateProduct = await Product.updateOne(
        { _id: currentPurchase.productId },
        { $inc: { quantity: +difference } }
      );
    }

    // Update
    const data = await Purchase.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Purchase.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Purchase"
        */
    // mevcut adet bilgisini al:
    const currentPurchase = await Purchase.findOne({ _id: req.params.id });

    // Delete
    const purchase = await Purchase.deleteOne({ _id: req.params.id });

    // Adedi Product'dan eksilt:
    const updateProduct = await Product.updateOne(
      { _id: currentPurchase.productId },
      { $inc: { quantity: -currentPurchase.quantity } }
    );

    res.status(purchase.deletedCount ? 204 : 404).send({
      error: !purchase.deletedCount,
      purchase,
    });
  },
};
