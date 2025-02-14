"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/category:

const category = require("../controllers/category");
const permissions = require("../middlewares/permissions");

// URL: /categories

// router.route('/')
//     .get(permissions.isStaff, category.list)
//     .post(permissions.isAdmin, category.create)

// router.route('/:id')
//     .get(permissions.isStaff, category.read)
//     .put(permissions.isAdmin, category.update)
//     .patch(permissions.isAdmin, category.update)
//     .delete(permissions.isAdmin, category.delete)

router
  .route("/(:id)?")
  .post(permissions.isAdmin, category.create)
  .get(permissions.isStaff, category.read)
  .put(permissions.isAdmin, category.update)
  .patch(permissions.isAdmin, category.update)
  .delete(permissions.isAdmin, category.delete);

/* ------------------------------------------------------- */
module.exports = router;
