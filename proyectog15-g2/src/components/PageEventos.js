import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from "axios";

const url = 'http://localhost:5000/eventos';

class PageEventos extends Component {
    state = {
        data:[], 
        modalInsertar:false,
        modalEliminar:false,
        tipoModal:'',
        form:{
            _id:'',
            eve_fecha:'',
            equ_equipo1:'',
            equ_equipo2:'',
            eve_marca1:'',
            eve_marca2:'',
            dep_id:'',
            eve_descrip:'',
        },
        equipos: [],
        deportes: []        
    }

    peticionGet = () => {
        axios.get(url+ '/home').then(response => {
        console.log(response.data);
        this.setState({data:response.data})
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionGetDeportes = () => {
        axios.get('http://localhost:5000/deportes').then(response => {
            //console.log(response.data);
            this.setState({deportes:response.data})
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionGetEquipos = () => {
        axios.get('http://localhost:5000/equipos').then(response => {
            //console.log(response.data);
            this.setState({equipos:response.data})
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPost = async () => {
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar(); // para cerrar el modal
            this.peticionGet();   // para actualizar el listado
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionPut = () => {
        axios.put(url + '/' + this.state.form._id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionDelete = () => {
        axios.delete(url + '/' + this.state.form._id).then(response => {
            this.modalEliminar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    modalInsertar = () => {
        this.setState({modalInsertar:!this.state.modalInsertar})
    }

    modalEliminar = () => {
        this.setState({modalEliminar:!this.state.modalEliminar})
    }

    handleChange = async (e) => {  // Funcion para capturar los datos del usuario. Es en 2do plano, debe ser asincrona
        e.persist();                // y por eso debemos especificar persistencia
        await this.setState({      // await regresa la ejecucion de la funcion asincrona despues de terminar
            form:{
                ...this.state.form,   // esta linea sirve para conservar los datos que ya tenia el arreglo
                [e.target.name]:e.target.value   // los nombres de los imputs deben ser iguales a los del arreglo
            }
        });
        console.log(this.state.form) // probar por consola
    }   
    
    seleccionarEvento = (evento) => {
        this.setState({
            tipoModal:'actualizar',
            form:{
                _id: evento._id,
                eve_fecha:evento.eve_fecha,
                eve_equipo1:evento.eve_equipo1,
                eve_equipo2:evento.eve_equipo2,
                eve_marca1:evento.eve_marca1,
                eve_marca2:evento.eve_marca2,
                dep_id:evento.dep_id,
                eve_descrip:evento.eve_descrip,
            }
        })
    }

    componentDidMount(){
        this.peticionGet();
        this.peticionGetDeportes();
        this.peticionGetEquipos();
        console.log(this.state.data)
    }
    
    render(){
        const form=this.state.form

        return (
            <div className="App">
                <br /><br /><br />
                <button className="btn btn-success" onClick={()=>{
                    this.setState({form:null, tipoModal:'insertar'});
                    this.modalInsertar()
                    }}>Agregar Evento</button>
                <br /><br />
                <table className="table"  class="table table-striped">
                    <thead>
                        <tr>
                            {/*<th>ID</th>*/}
                            <th>FECHA</th>
                            <th>EQUIPO A</th>
                            <th>MARCADOR A</th>                            
                            <th>EQUIPO B</th>
                            <th>MARCADOR B</th>
                            <th>DEPORTE</th>
                            <th>DESCRIPCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(evento =>{
                                return(
                                    <tr>
                                        {/*<td>{evento._id}</td>*/} 
                                        <td>{evento.fecha}</td> 
                                        <td>{evento.equipo1}</td> 
                                        <td>{evento.marca1}</td>
                                        <td>{evento.equipo2}</td>
                                        <td>{evento.marca2}</td> 
                                        <td>{evento.deporte}</td> 
                                        <td>{evento.descrip}</td>           
                                        <td>
                                        <button className="btn btn-primary" onClick={() => {
                                            this.seleccionarEvento(evento);
                                            this.modalInsertar();
                                            console.log(this.state.form)
                                        }}><FontAwesomeIcon icon={faEdit}/></button>
                                        {"  "}
                                        <button className="btn btn-danger" onClick={() => {
                                            this.seleccionarEvento(evento);
                                            this.modalEliminar();
                                        }}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalInsertar}>
                  <ModalHeader style={{display:'block'}}></ModalHeader>
                  <ModalBody>
                    {/*<label htmlFor="_id">ID</label>
                    <input className="form-control" type="text" name="_id" id="_id" readOnly onChange={this.handleChange} value={form ? form._id : this.state.data.length}/> <br />*/}
                    <label htmlFor="eve_fecha">FECHA</label>
                    <input className="form-control" type="date" name="eve_fecha" id="eve_fecha" onChange={this.handleChange} value={form ? form.eve_fecha : ''}/> <br />
                    <label htmlFor="equ_equipo1">EQUIPO A</label>
                    <select className="form-control" type="text" name="equ_equipo1" id="equ_equipo1" onChange={this.handleChange}>
                        <option disabled selected>Seleccione un equipo</option>
                        {
                            this.state.equipos.map ((equi) => {
                                return(
                                    <option value={equi._id}>{equi.equ_nombre}</option>
                                )
                            })
                        }
                    </select> <br />
                    <label htmlFor="eve_marca1">MARCADOR A</label>
                    <input className="form-control" type="text" name="eve_marca1" id="eve_marca1" onChange={this.handleChange} value={form ? form.eve_marca1 : ''}/> <br />
                    <label htmlFor="equ_equipo2">EQUIPO B</label>
                    <select className="form-control" type="text" name="equ_equipo2" id="equ_equipo2" onChange={this.handleChange}> 
                        <option disabled selected>Seleccione un equipo</option>          
                        {
                            this.state.equipos.map ((equi) => {
                                return(
                                    <option value={equi._id}>{equi.equ_nombre}</option>
                                )
                            })
                        }
                    </select> <br />
                    <label htmlFor="eve_marca2">MARCADOR B</label>
                    <input className="form-control" type="text" name="eve_marca2" id="eve_marca2" onChange={this.handleChange} value={form ? form.eve_marca2 : ''}/> <br />
                    <label htmlFor="dep_id">DEPORTE</label>
                    <select className="form-control" type="text" name="dep_id" id="dep_id" onChange={this.handleChange}> 
                        <option disabled selected>Seleccione un deporte</option>
                        {
                            this.state.deportes.map ((dep) => {
                                return(
                                    <option value={dep._id}>{dep.dep_nombre}</option>
                                )
                            })
                        }
                    </select> <br />
                    <label htmlFor="eve_descrip">DESCRIPCIÓN</label>
                    <input className="form-control" type="text" name="eve_descrip" id="ev_edescri" onChange={this.handleChange} value={form ? form.eve_descrip : ''}/> <br />
                  </ModalBody>
                  <ModalFooter>
                    {
                        this.state.tipoModal==='insertar'?
                        <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                        :
                        <button className="btn btn-success" onClick={() => this.peticionPut()}>Actualizar</button>
                    }                 
                    <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Está segur@ de eliminar este registro?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Si</button>
                        <button className="btn btn-primary" onClick={() => this.modalEliminar()}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    };
}

export default PageEventos