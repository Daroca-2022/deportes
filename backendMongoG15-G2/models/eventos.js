const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Deportes=mongoose.model('deportes')
const Equipos=mongoose.model('equipos')
const Usuarios=mongoose.model('usuarios')

const eventosSchema=new Schema({
    eve_fecha:{type:Date,unique:true},
    equ_equipo1:{type: Schema.ObjectId, ref: "equipos"},
    equ_equipo2:{type: Schema.ObjectId, ref: "Equipos"},
    eve_marca1:{type:Number},
    eve_marca2:{type:Number},
    dep_id:{type: Schema.ObjectId, ref: "Deportes"},
    eve_descrip:{type:String,Trim:true}
    
})

module.exports=mongoose.model('eventos',eventosSchema)