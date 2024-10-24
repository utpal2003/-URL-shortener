const { getUser } = require("../service/auth")

async function resticttoLoggedinUseronly(req, res, next) {
    const userid = req.cookies.uid;
    if (!userid) {
        return res.redirect("/login");

    }
    const user = getUser(userid);
    if (!user) {
        return res.redirect("/login")
    }
    req.user = user;
    next();

}
/////////////////////
// async function checkAuth(req,res,next) {
//     const userid = req.cookies.uid;
//     const user = getUser(userid);
//     req.user = user;
//     next();
// }

// // Middleware to check authentication
// async function checkAuth(req, res, next) {
//     const token = req.cookies.uid;  // Get the token from cookies

//     if (!token) {
//         return res.status(401).send("Unauthorized: No token provided");
//     }

//     const user = await getUser(token);  // Verify and decode token

//     if (!user) {
//         return res.status(401).send("Unauthorized: Invalid token");
//     }

//     req.user = user;  // Attach the user to the request object
//     next();  // Move to the next middleware or route handler-*
// }


module.exports={
    resticttoLoggedinUseronly,
    checkAuth
}