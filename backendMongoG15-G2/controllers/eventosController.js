const eventos=require('../models/eventos')

exports.eventosHome = async (req, res) => {
    try{
        const colEventos = await eventos.aggregate(
            [
                {
                    '$lookup': {
                        'from': 'equipos', 
                        'localField': 'equ_equipo1', 
                        'foreignField': '_id', 
                        'as': 'equipo1'
                    }
                }, {
                    '$lookup': {
                        'from': 'equipos', 
                        'localField': 'equ_equipo2', 
                        'foreignField': '_id', 
                        'as': 'equipo2'
                    }
                }, {
                    '$lookup': {
                        'from': 'deportes', 
                        'localField': 'dep_id', 
                        'foreignField': '_id', 
                        'as': 'deporte'
                    }
                }, {
                    '$unwind': {
                        'path': '$equipo1'
                    }
                }, {
                    '$unwind': {
                        'path': '$equipo2'
                    }
                }, {
                    '$unwind': {
                        'path': '$deporte'
                    }
                }, {
                    '$project': {
                        '_id': '$_id', 
                        'fecha': '$eve_fecha', 
                        'equipo1': '$equipo1.equ_nombre', 
                        'equipo2': '$equipo2.equ_nombre', 
                        'marca1': '$eve_marca1', 
                        'marca2': '$eve_marca2', 
                        'deporte': '$deporte.dep_nombre',
                        'descrip': '$eve_descrip', 
                    }
                }, {
                    '$sort': {
                        'fecha': 1
                    }
                }
            ]
        )
        res.json(colEventos);
    } catch(error){
        console.log(error);
        res.send(error);
        next()  
    }
};

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