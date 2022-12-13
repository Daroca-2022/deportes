//para llamar el model
const equipos=require('../models/equipos')

//primera accion listar todos
exports.list=async(req,res)=>{

    try{

        const colequipos=await equipos.find({})
        res.json(colequipos)
    }catch(error){
        console.log(error) //mostrar el error
        res.send(error) //envia el error al navegador
        next() //si hay un error que lo retorne
    }
}

//primera accion ingresar todos
exports.add=async(req,res)=>{
    const equipo=new equipos(req.body)
    try{
        
        await equipo.save()
        res.json({message:'nuevo equipo agregado'})
    }catch(error){
        console.log(error) //mostrar el error
        res.send(error) //envia el error al navegador
        next() //si hay un error que lo retorne
    }
}

//primera accion actualizar todos
exports.update=async(req,res, next)=>{
    
    try{
       
        const equipo=await equipos.findOneAndUpdate(
            {_id:req.params.id}, //hace la comparacion con id del parametro
            req.body,  //todo del cuerpo del envio el reemplazo
            {new:true}  //para conservar todo el arreglo de todos los campos que se modifican
        )
        res.json({message:'equipo actualizado'})
    }catch(error){
        console.log(error) //mostrar el error
        res.send(error) //envia el error al navegador
        next() //si hay un error que lo retorne
    }
}

//primera accion eliminar todos
exports.delete=async(req,res, next)=>{
    
    try{
       
        const equipo=await equipos.findByIdAndDelete(
            {_id:req.params.id} //hace la comparacion con id del parametro            
        )
        res.json({message:'equipo eliminado'})
    }catch(error){
        console.log(error) //mostrar el error
        res.send(error) //envia el error al navegador
        next() //si hay un error que lo retorne
    }
}