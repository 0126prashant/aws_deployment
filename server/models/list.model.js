const mongoose = require("mongoose")

const listSchema = mongoose.Schema({
    title :String,
    overview :String,
    img_url :String,
    creatorName : {type : String},
    creatorId : {type : mongoose.Schema.Types.ObjectId,ref:"users"}
},{
    versionKey : false
})

const ListModel = mongoose.model("list",listSchema)

module.exports = {
    ListModel
}