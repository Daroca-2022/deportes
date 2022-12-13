const deportes=require('../models/deportes')

//primera accion listar todos
exports.list=async(req,res)=>{

    try{

        const colDeportes=await deportes.find({})
        res.json(colDeportes)
    }catch(error){
        console.log(error) 
        res.send(error) 
        next() 
    }
}

//primera accion ingresar todos
exports.add=async(req,res,next)=>{
    const deporte=new deportes(req.body)
    try{
        
        await deporte.save()
        res.json({message:'nuevo deporte agregado'})
    }catch(error){
        console.log(error) 
        res.send(error) 
        next() 
    }
}

//primera accion actualizar todos
exports.update=async(req,res, next)=>{
    
    try{
       
        const deporte=await deportes.findOneAndUpdate(
            {_id:req.params.id}, 
            req.body,  
            {new:true}  
        )
        res.json({message:'deporte actualizado'})
    }catch(error){
        console.log(error) 
        res.send(error) 
        next() 
    }
}

//primera accion eliminar todos
exports.delete=async(req,res,next)=>{
    
    try{
       
        const deporte=await deportes.findByIdAndDelete(
            {_id:req.params.id}             
        )
        res.json({message:'deporte eliminado'})
    }catch(error){
        console.log(error) 
        res.send(error) 
        next() 
    }
}