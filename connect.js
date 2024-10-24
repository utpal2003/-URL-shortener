const mongoose = require("mongoose")
mongoose.set("strictQuery",true)
async function connectmongodb(url) {
    return mongoose.connect(url)
}
module.exports = {connectmongodb}