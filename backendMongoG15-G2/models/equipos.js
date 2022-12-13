//Este Schema ayuda que la información conserve esta estructura en bd no relacional o los datos lleguen ordenados
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const equiposSchema=new Schema({
    equ_nombre:{type:String, Trim:true,unique:true},
})

//se utiliza porque va ser llamado desde otro modulo
module.exports=mongoose.model('equipos',equiposSchema)