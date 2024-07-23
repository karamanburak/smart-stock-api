"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
// User Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const users = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      totalRecords: users.length,
      users,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

    // Yeni kayıtlarda admin/staff = false
    req.body.isStaff = false;
    req.body.isAdmin = false;

    // console.log("create before");
    const newUser = await User.create(req.body);
    // console.log("create after");

    /* AUTO LOGIN *
        const tokenData = await Token.create({
            userId: data._id,
            token: passwordEncrypt(data._id + Date.now())
        })
        /* AUTO LOGIN */

    res.status(201).send({
      error: false,
      //   token: tokenData.token,
      newUser,
    });
  },

  read: async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      user,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */
    // console.log("--->>", req.params.id, req.user?.isAdmin);

    // Sadece kendi kaydını güncelleyebilir:
    //const customFilters = req.user?.isAdmin ? { _id: req.params.id } : { _id: req.user._id }
    const customFilters = { _id: req.params.id };

    // Yeni kayıtlarda admin/staff durumunu değiştiremez:
    if (!req.user?.isAdmin) {
      delete req.body.isStaff;
      delete req.body.isAdmin;
    }

    const user = await User.updateOne(customFilters, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      user,
      new: await User.findOne(customFilters),
    });
  },

  delete: async (req, res) => {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(user.deletedCount ? 204 : 404).send({
      error: !user.deletedCount,
      user,
    });
  },
};
