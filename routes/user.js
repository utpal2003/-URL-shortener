const express = require("express");
const {usersignup,userslogin} = require("../controllers/user")

const router =express.Router();

router.post("/",usersignup)
router.post("/login",userslogin)

module.exports = router