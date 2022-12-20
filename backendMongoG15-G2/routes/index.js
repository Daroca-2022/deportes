const express=require('express')
const router=express.Router()
const usuariosController=require('../controllers/usuariosController')
const equiposController=require('../controllers/equiposController')
const deportesController=require('../controllers/deportesController')
const eventosController=require('../controllers/eventosController')

module.exports=()=>{

    //llamado get de login
    router.get('/usuarios/:email/:clave',usuariosController.authGet)

    //llamado get de usuarios
    router.get('/usuarios',usuariosController.list)
   
    //llamado post de usuarios
    router.post('/usuarios',usuariosController.add)

    //llamado put de usuarios
    router.put('/usuarios/:id',usuariosController.update)

    //llamado delete de usuarios
    router.delete('/usuarios/:id',usuariosController.delete)

    //llamado get de equipos
    router.get('/equipos',equiposController.list)
    
    //llamado post de equipos
    router.post('/equipos',equiposController.add)

    //llamado put de equipos
    router.put('/equipos/:id',equiposController.update)

    //llamado delete de equipos
    router.delete('/equipos/:id',equiposController.delete)

    //llamado get de deportes
    router.get('/deportes',deportesController.list)
    
    //llamado post de deportes
    router.post('/deportes',deportesController.add)

    //llamado put de deportes
    router.put('/deportes/:id',deportesController.update)

    //llamado delete de deportes
    router.delete('/deportes/:id',deportesController.delete)
    
    
    //llamado get de eventos
    router.get('/eventos/home',eventosController.eventosHome)

    //llamado get de eventos
    router.get('/eventos',eventosController.list)
    
    //llamado post de eventos
    router.post('/eventos',eventosController.add)

    //llamado put de eventos
    router.put('/eventos/:id',eventosController.update)

    //llamado delete de eventos
    router.delete('/eventos/:id',eventosController.delete)

    return router
}

