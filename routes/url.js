const express = require("express");
const router= express.Router();
const {generatershortNewyurl,redirectWithTracking,handlegetAnalytic} = require("../controllers/url")

router.post("/",generatershortNewyurl)
router.get("/:shortId", redirectWithTracking);
router.get("/analyatics/:shortId",handlegetAnalytic)

module.exports = router;