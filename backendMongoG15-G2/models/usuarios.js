const mongoose=require('mongoose')
const Schema=mongoose.Schema

const usuariosSchema=new Schema({
    usu_email:{type:String,Trim:true,unique:true,lowercase:true},
    usu_clave:{type:String,Trim:true},
    usu_nombres:{type:String,Trim:true},
    usu_apellidos:{type:String,Trim:true}
})

module.exports=mongoose.model('usuarios',usuariosSchema)