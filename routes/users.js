var express = require("express");
var router = express.Router();
var models = require("../models");
var jwt = require("jsonwebtoken");

//rendering register page
router.get("/reg", function (req, res, next) {
  res.render("register", { title: "회원가입" });
});

//register user
router.post("/reg", async function (req, res, next) {
  let body = req.body;
  await models.User.create({
    user_id: body.userId,
    user_name: body.userName,
    user_password: body.userPassword,
  })
    .then((result) => {
      console.log("success to reg user");
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

//rendering login page
router.get("/login", function (req, res, next) {
  res.render("login", { title: "로그인" });
});

//login user
router.post("/login", async function (req, res, next) {
  let body = req.body;
  await models.User.findOne({
    where: { user_id: body.userId, user_password: body.userPassword },
  })
    .then((result) => {
      if (result !== null) {
        console.log("로그인성공: ", result.dataValues.user_id);
        global.userId = result.dataValues.user_id;
        res.render("mypage", { title: "마이페이지" });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

//get UserInfo
router.get("/me", async function (req, res, next) {
  if (global.userId == undefined) {
    res.json("-1");
  }
  await models.User.findOne({
    where: { id: global.userId },
  })
    .then((result) => {
      res.json(result.dataValues);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
