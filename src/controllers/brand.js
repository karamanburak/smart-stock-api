"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
// Brand Controller:

const Brand = require("../models/brand");

module.exports = {
  list: async (req, res) => {
    /*    
            #swagger.tags = ["Brands"]
            #swagger.summary = "List Brands"
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
    const brands = await res.getModelList(Brand);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Brand),
      totalRecords: brands.length,
      brands,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Create Brand"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Brand 1"
                }
            }
        */
    // userId verisni req.user'dan al
    req.body.userId = req.user._id;

    //* Create
    const newBrand = await Brand.create(req.body);
    res.status(201).send({
      error: false,
      newBrand,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Get Single Brand"
        */
    const brand = await Brand.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Brand),
      brand,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Update Brand"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Brand 1"
                }
            }
        */
    const brand = await Brand.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      newBrand: await Brand.findOne({ _id: req.params.id }),
      brand,
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Brands"]
            #swagger.summary = "Delete Brand"
        */
    const brand = await Brand.deleteOne({ _id: req.params.id });
    res.status(brand.deletedCount ? 204 : 404).send({
      error: !brand.deletedCount,
      brand,
    });
  },
};
