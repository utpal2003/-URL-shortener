const User = require("../models/user")
// const {v4: uuidv4} = require("uuid");
const {setUser} = require("../service/auth")

const usersignup = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/")
}

const userslogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if (!user) {
        res.render("login", {
            error: "Invalid email or password",
        })
    }
   const token =  setUser(user);
    res.cookie("uid",token)
    return res.redirect("/")
}
module.exports = {
    usersignup,
    userslogin
}