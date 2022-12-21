const usuarios=require('../models/usuarios')

// GET verificacion existencia usuario logeado
exports.authGet = async (req, res, next) => {
    try{
        const user = await usuarios.find({usu_email:req.params.email,usu_clave:req.params.clave} );
        if(user.length == 0){
            return res.json({msg:"el usuario no existe"})
        }
        return res.json(user);
    } catch(error){
        console.log(error);
        res.send(error);
        next()  
    }
};


//primera accion listar todos
exports.list=async(req,res)=>{

    try{
   
        const colUsuarios=await usuarios.find({})
        res.json(colUsuarios)
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion ingresar todos
exports.add=async(req,res, next)=>{
const usuario=new usuarios(req.body)
    try{
   
        await usuario.save()
        res.json({message:'nuevo usuario agregado'})
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion actualizacion todos
exports.update=async(req,res,next)=>{
    
        try{
                  
            const usuario=await usuarios.findOneAndUpdate(
                {_id:req.params.id},
                req.body, 
                {new:true}
            )
            res.json({message:'usuario actualizado'})
        }catch(error){
    
            console.log(error)
            res.send(error)
            next()
        }
    }

    //primera accion eliminacion todos
exports.delete=async(req,res,next)=>{
    
    try{
              
        const usuario=await usuarios.findByIdAndDelete(
            {_id:req.params.id}        
        )
        res.json({message:'usuario eliminado'})
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}