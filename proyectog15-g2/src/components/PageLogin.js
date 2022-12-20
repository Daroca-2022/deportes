import React, { Component } from 'react'
import '../css/Login.css'
import '../imagenes/logo.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Cookies from 'universal-cookie'

const urlLogin="http://localhost:5000/usuarios"
const cookies = new Cookies();

class PageLogin extends Component {
    state={
        form:{
            email: '',
            password: '',
            
        }        
    }
    
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        })
        //console.log(this.state.form)
    }

    iniciarSesion=async()=>{
        let email=this.state.form.email
        let pwd=this.state.form.password
        if(email.length<=0 || pwd.length<=0){
            alert('Se requieren todos los datos para continuar');            
            return "Datos Vacios"
        }
        
        await axios.get(urlLogin+"/"+email+"/"+pwd)
        .then(response=>{
            //console.log(response.data)
            return response.data
        }).then(response=>{
            if(response.length>0){
              var resp=response[0] // para evitar llamados tan largos con corchetes
              cookies.set("_id",resp._id,{path:"/"})/// el path es para que se puedan acceder de cualquier pagina
              cookies.set("usu_email",resp.usu_email,{path:"/"})
              cookies.set("usu_email",resp.usu_email,{path:"/"})
              cookies.set("usu_nombres",resp.usu_nombres,{path:"/"})
              cookies.set("usu_apellidos",resp.usu_apellidos,{path:"/"})
              alert("Bienveni@ "+resp.usu_nombres+" "+ resp.usu_apellidos)
              
              window.location.href='./'
            }else{
                alert("Verificar Usario y/o Clave")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }


    render() {
        return(
        <div className="containerPrincipal">
            <div className="containerSecundario">
                <div className="form-group">
                    <label>Email: </label>
                    <br />
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.handleChange}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                </div>
            </div>
        </div>
        )
    }
}

export default PageLogin