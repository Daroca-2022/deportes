const eventos=require('../models/eventos')



//primera accion listar todos
exports.list=async(req,res)=>{

    try{
   
        const colEventos=await eventos.find({})
        res.json(colEventos)
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}


//primera accion ingresar todos
exports.add=async(req,res,next)=>{
const evento=new eventos(req.body)
    try{
   
        await evento.save()
        res.json({message:'nuevo evento agregado'})
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion actualizacion todos
exports.update=async(req,res,next)=>{
    
        try{
                  
            const evento=await eventos.findOneAndUpdate(
                {_id:req.params.id},
                req.body, 
                {new:true}
            )
            res.json({message:'evento actualizado'})
        }catch(error){
    
            console.log(error)
            res.send(error)
            next()
        }
    }

    //primera accion eliminacion todos
exports.delete=async(req,res,next)=>{
    
    try{
              
        const evento=await eventos.findByIdAndDelete(
            {_id:req.params.id}        
        )
        res.json({message:'evento eliminado'})
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}