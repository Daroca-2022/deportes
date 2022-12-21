require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const routes=require('./routes')

const app=express()
const conexion=process.env.MONGO_CONEXION
const port=process.env.PORT

mongoose.Promise=global.Promise
mongoose.connect(
    conexion,
    {useNewUrlParser:true,}
)

//habilitar el bodyParser
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

app.use('/',routes())

app.listen(port || 5000,()=>{
    console.log('server listen in:' + port)
})
