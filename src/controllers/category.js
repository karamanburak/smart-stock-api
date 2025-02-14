"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
// Category Controller:

const Category = require("../models/category");

module.exports = {
  list: async (req, res) => {
    /*    
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Categories"
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
    const categories = await res.getModelList(Category);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Category),
      totalRecords: categories.length,
      categories,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Create Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Category 1"
                }
            }
        */
    const newCategory = await Category.create(req.body);
    res.status(201).send({
      error: false,
      newCategory,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Get Single Category"
        */
    if (req.params.id) {
      // Single

      const category = await Category.findOne({ _id: req.params.id });

      res.status(200).send({
        error: false,
        category,
      });
    } else {
      // All

      const categories = await res.getModelList(Category);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Category),
        totalRecords: categories.length,
        categories,
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Update Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Category 1"
                }
            }
        */
    const category = await Category.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );

    res.status(202).send({
      error: false,
      newCategory: await Category.findOne({ _id: req.params.id }),
      category,
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Delete Category"
        */
    const category = await Category.deleteOne({ _id: req.params.id });
    res.status(category.deletedCount ? 204 : 404).send({
      error: !category.deletedCount,
      category,
    });
  },
};
