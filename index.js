const express = require("express")
const { connectmongodb } = require("./connect.js");
const cookieParser = require("cookie-parser");
const { resticttoLoggedinUseronly, checkAuth } = require("./middleware/auth.js")


// all routes import
const urlRouter = require("./routes/url.js")
const staticRoute = require("./routes/staticRouter.js")
const userRoute = require(("./routes/user"))

// for ejs setup
const path = require("path");


const app = express();
const port = 8000

// mongodb connection
connectmongodb("mongodb://localhost:27017/URL_SHORTNER").then(() => {
    console.log("mongodb connected")
}).catch((err) => {
    console.err(err)
})


// EJS Setup
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"))
///


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())





app.use("/url", resticttoLoggedinUseronly, urlRouter);
app.use("/user", userRoute);
app.use('/', checkAuth, staticRoute);







app.listen(port, () => {
    console.log(`port is running on ${port}`)
})