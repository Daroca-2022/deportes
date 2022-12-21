const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const routes=require('./routes')

const app=express()

mongoose.Promise=global.Promise
mongoose.connect(
    'mongodb+srv://Felipe:1234G15@cluster0.2uojakj.mongodb.net/deportes',
    {useNewUrlParser:true,}
)

//habilitar el bodyParser
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

app.use('/',routes())

app.listen(5000,()=>{
    console.log('server listen in: 5000')
})
