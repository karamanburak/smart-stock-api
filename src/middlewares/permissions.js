"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | smart-stock-api
------------------------------------------------------- */
const { CustomError } = require("../errors/customError");

// Middleware: permissions

module.exports = {
  // isLogin: (req, res, next) => {
  //   if (req.user && req.user.isActive) {
  //     next();
  //   } else {
  //     throw new CustomError("NoPermission: You must login.", 403);
  //   }
  // },
  // isLoginStaffOrAdmin: (req, res, next) => {
  //   if (process.env.NODE_ENV == "development") return next();
  //   if (
  //     req.user &&
  //     req.user.isActive &&
  //     (req.user.isStaff || req.user.isAdmin)
  //   ) {
  //     next();
  //   } else {
  //     throw new CustomError(
  //       "NoPermission: You must login and to be Staff or Admin.",
  //       403
  //     );
  //   }
  // },
  // isLoginAdmin: (req, res, next) => {
  //   if (process.env.NODE_ENV == "development") return next(); //* development ortmaında permissionlara takılmamk için
  //   if (req.user && req.user.isActive && req.user.isAdmin) {
  //     next();
  //   } else {
  //     throw new CustomError(
  //       "NoPermission: You must login and to be Admin.",
  //       403
  //     );
  //   }
  // },

  // isStaffOrAdmin: (req, res, next) => {
  //   if (req.user.isStaff || req.user.isAdmin) {
  //     next();
  //   } else {
  //     throw new CustomError(
  //       "NoPermission: You must to be Staff or Admin.",
  //       403
  //     );
  //   }
  // },
  // isAdmin: (req, res, next) => {
  //   if (req.user.isAdmin) {
  //     next();
  //   } else {
  //     throw new CustomError("NoPermission: You must to be Admin.", 403);
  //   }
  // },
  // isAdminOrStaffOrOwn: async (req, res, next) => {
  //   //* User-Reservation-Passenger models

  //   if (!req.user.isAdmin && !req.user.isStaff) {
  //     const checkData = await req.model.findOne({ _id: req.params.id });
  //     if (
  //       (checkData.createdId?.toString() || checkData._id?.toString()) !=
  //       req.user._id.toString()
  //     ) {
  //       throw new CustomError(
  //         "NoPermission! You must be admin or staff or own!",
  //         403
  //       );
  //     }
  //   }

  //   next();
  // },

  isLogin: (req, res, next) => {
    // return next()

    if (req.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login.");
    }
  },

  isStaff: (req, res, next) => {
    // return next()

    if (
      req.user &&
      req.user.isActive &&
      (req.user.isAdmin || req.user.isStaff)
    ) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },

  isAdmin: (req, res, next) => {
    // return next()

    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission: You must login and to be Admin.");
    }
  },
};
