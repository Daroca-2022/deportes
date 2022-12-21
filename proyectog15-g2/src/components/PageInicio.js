import React, { Component } from 'react'

import axios from "axios";//
import "bootstrap/dist/css/bootstrap.min.css";//

const urlEventos = 'https://backendg15-02-production.up.railway.app/eventos/home'

class PageInicio extends Component{
   
    state={
        data: []
    }


    peticionGet = () => {
        axios.get(urlEventos).then(response => {
          //console.log(response.data);
          this.setState({data:response.data})
        }).catch(error => {
          console.log(error.message);
        })
      }

      componentDidMount(){
        this.peticionGet()
      }


    render(){
        return <div>
            <table className="table ">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Equipo1</th>
            <th>Marcador</th>             
            <th>Equipo2</th>
            <th>Deporte</th>            
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(evento => {
            return(
              <tr key={evento._id}>
                <td>{evento.fecha}</td> 
                <td>{evento.equipo1}</td> 
                <td>{evento.marca1+" : "+evento.marca2}</td>
                <td>{evento.equipo2}</td>
                <td>{evento.deporte}</td> 
                <td>{evento.descrip}</td> 
              </tr>
            )
          })}
        </tbody>
        </table>
        </div>
    }
}

export default PageInicio
