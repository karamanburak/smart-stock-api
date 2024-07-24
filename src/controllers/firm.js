"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
// Firm Controller:

const Firm = require("../models/firm");

module.exports = {
  list: async (req, res) => {
    /*    
            #swagger.tags = ["Firms"]
            #swagger.summary = "List Firms"
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
    const firms = await res.getModelList(Firm);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Firm),
      totalRecords: firms.length,
      firms,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Create Firm"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Firm 1"
                }
            }
        */
    const newFirm = await Firm.create(req.body);
    res.status(201).send({
      error: false,
      newFirm,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Get Single Firm"
        */
    if (req.params.id) {
      // Single

      const firm = await Firm.findOne({ _id: req.params.id });

      res.status(200).send({
        error: false,
        firm,
      });
    } else {
      // All

      const firms = await res.getModelList(Firm);

      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Firm),
        totalRecords: firms.length,
        firms,
      });
    }
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Update Firm"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Firm 1"
                }
            }
        */
    const firm = await Firm.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      newFirm: await Firm.findOne({ _id: req.params.id }),
      firm,
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Firms"]
            #swagger.summary = "Delete Firm"
        */
    const firm = await Firm.deleteOne({ _id: req.params.id });
    res.status(firm.deletedCount ? 204 : 404).send({
      error: !firm.deletedCount,
      firm,
    });
  },
};
