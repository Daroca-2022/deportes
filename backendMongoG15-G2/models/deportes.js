const mongoose=require('mongoose')
const Schema=mongoose.Schema

const deportesSchema=new Schema({
    dep_nombre:{type:String, Trim:true,unique:true},
})

//se utiliza porque va ser llamado desde otro modulo
module.exports=mongoose.model('deportes',deportesSchema)