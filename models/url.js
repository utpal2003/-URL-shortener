const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type:String
    },
    visithistory:[
        {timestamp:{type:Number}}],
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true});


const URL = mongoose.model('url',urlSchema)
module.exports = URL;