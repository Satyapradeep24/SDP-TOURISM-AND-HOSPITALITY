const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    lname: {
        type : String,
        required:true
    },
    lreviews: {
        type : Number,
        required:true
    },
    lphonenumber: {
        type : Number,
        required:true
    },
    lrentperday: {
        type : String,
        required:true
    },
    limageurls:[],
    lcurrentbookings:[],
    ltype:{
        type: String,
        required:true
    },
    ldescription:{
        type: String,
        required:true
    }
},{
    timestamps:true
})
const locationsModel = mongoose.model("locations",locationSchema);
module.exports = locationsModel