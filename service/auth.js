// const sessionIdToUsermap = new Map();
const jwt = require("jsonwebtoken");
const secretkey = "utpalbaranudf";


// function setUser(user) {
//     // Ensure the payload is a plain object
//     const payload = {
//         id: user.id,  // example field
//         email: user.email  // example field
//     };

//     // Sign the token using your secret key
//     return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
// }

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },secretkey);
};


// function getUser(token) {
//     if (!token) {
//         return null
//     }
//     try{
//         return jwt.verify(token, secreatkey)
//     }catch(error){
//         return null
//     }
// };
///////////chat gpt
// Function to verify the JWT and get user data
async function getUser(token) {
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, secretkey);  // Verify the token
        return decoded;  // Return the decoded user object
    } catch (error) {
        console.error("Error verifying token:", error.message);  // Log the error
        return null;  // Return null if token verification fails
    }
}


module.exports = {
    setUser,
    getUser
}