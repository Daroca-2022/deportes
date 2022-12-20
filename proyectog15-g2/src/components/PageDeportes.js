import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const url="http://localhost:5000/deportes"

class PageDeportes extends Component{
    state={
        data:[],
        modalInsertar:false,
        modalEliminar:false,
        tipoModal:'',
        form:{
          _id:'',
          dep_nombre:'',
        }
    
      }
       
      peticionGet=()=>{
        axios.get(url).then(response=>{
          this.setState({data:response.data})
          //console.log(response.data);
        }).catch(error=>{
          console.log(error.message);
        })
        }
    
        peticionPost=async()=>{
            await axios.post(url,this.state.form).then(response=>{
            this.modalInsertar(); /// para cerrar la modal
            this.peticionGet(); /// para actualizar el listado
          }).catch(error=>{
            console.log(error.message);
          })
        }
    
        peticionPut=()=>{
          axios.put(url+'/'+this.state.form._id, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
          }).catch(error=>{
            console.log(error.message);
          })
        }
    
        peticionDelete=()=>{
          axios.delete(url+'/'+this.state.form._id).then(response=>{
            this.modalEliminar();
            this.peticionGet();
          }).catch(error=>{
            console.log(error.message);
          })
        }
    
        modalInsertar=()=>{
          this.setState({modalInsertar: !this.state.modalInsertar})
        }
    
        modalEliminar=()=>{
          this.setState({modalEliminar: !this.state.modalEliminar})
        }
    
        handleChange=async e=>{  /// función para capturar os datos del usuario. Es en 2do plano debe ser asincrona
          e.persist();           /// y por reso debemos especificar persistencia
          await this.setState({   /// await regresa la ejecución de la función asincrona despues de terminar
            form:{
              ...this.state.form, /// esta linea sirve para conservar los datos que ya tenia el arreglo
              [e.target.name]: e.target.value  /// los nombres de los imputs deben ser iguales a los del arreglo
            }
          });
          console.log(this.state.form);  /// probar por consola lo que se guarda
          }
    
          seleccionarDeportes=(deporte)=>{
            this.setState({
              tipoModal: 'actualizar',
              form: {
                _id: deporte._id,
                dep_nombre: deporte.dep_nombre       
              }
            })
          }
    
      componentDidMount(){
         this.peticionGet();
      }
    
      render(){
    
        const form=this.state.form
    
      
      return (
        <div className="App">
          <br /><br /><br />
          <button className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}} >Agregar Deportes</button>    
          <br /><br />
          <table className="table ">
            <thead>
              <tr>
                {/*<th>ID</th>*/}
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(deporte=>{
                  return(
                    <tr>
                     {/*  <td>{deporte._id}</td>*/}
                      <td>{deporte.dep_nombre}</td>
                      <td>
                        <button className='btn btn-primary' onClick={()=>{this.seleccionarDeportes(deporte);this.modalInsertar();}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                        {"  "}
                        <button className='btn btn-danger' onClick={()=>{this.seleccionarDeportes(deporte);this.modalEliminar()}}><FontAwesomeIcon icon={faTrashAlt} ></FontAwesomeIcon></button>
                      </td> 
                    </tr>
                  )
                })
              }
                
            </tbody>
          </table>
    
          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{display:'block'}}>
    
            </ModalHeader>
            <ModalBody>
              {/*<label htmlFor="_id">ID</label>
              <input className="form-control" type="text" name="_id" id="_id" readOnly onChange={this.handleChange} value={form?form._id: this.state.data.length+1}></input><br />*/}
              <label htmlFor="dep_nombre">NOMBRES</label>
              <input className="form-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value={form?form.dep_nombre: ''}></input><br />
            </ModalBody>
            <ModalFooter>
            {
              this.state.tipoModal=='insertar'?
              <button className="btn btn-success" onClick={()=>this.peticionPost()}> Insertar </button>
              :<button className="btn btn-success" onClick={()=>this.peticionPut()}> Modificar </button>
            }
            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               está segur@ de eliminar este registro?
               
    
            </ModalBody>
            <ModalFooter>
              
              <button className="btn btn-danger" onClick={()=>{this.peticionDelete()}}>Si</button>
              <button className="btn btn-primary" onClick={()=>{this.modalEliminar()}}>No</button>
    
            </ModalFooter>
          </Modal>
    
        </div>
      );
      }
}

export default PageDeportes