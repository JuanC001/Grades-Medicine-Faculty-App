import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import GenerarAcordion from './EstudianteRotaciones/GenerarAcordion'

import Swal from 'sweetalert2';
import axios from 'axios';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

class AddStudent extends React.Component {

    async componentDidMount() {

        const ipBuilder = ip + '/api/admin/allHospital';
        const res = await axios.get(ipBuilder);
        this.setState({ hospitales: res.data });


    }

    generarAcordion = () => {

        const id_l = this.state.rotaciones.length + 1
        const nuevaRotacion = {
            text: 'Rotacion ' + id_l,
            id: id_l
        }
        this.setState({ rotaciones: this.state.rotaciones.concat(nuevaRotacion) })

    }

    eliminarRotacion = (e) => {
        const id = parseInt(e) - 1;
        let arregloaux = this.state.rotaciones;
        console.log(this.state.rotaciones.length);
        arregloaux.splice(id);
        console.log(arregloaux);
        
        this.setState({rotaciones: arregloaux});
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const ipBuilder = ip + '/api/admin/regisEstudiante';
        console.log(this.state.reg_nombres);
        console.log(this.state.documento);
        console.log(this.state.correo);
        console.log(this.state.lugar1);
        console.log(this.state.fechaInicial);
        console.log(this.state.fechaFinal);

        const nuevo = await axios.post(ipBuilder, {
            reg_nombres: this.state.reg_nombres,
            documento: this.state.documento,
            correo: this.state.correo,
            lugar1: this.state.lugar1,
            fechaInicial: this.state.fechaInicial,
            fechaFinal: this.state.fechaFinal,
            semestre: this.state.semestre,

        })
        let revision = true;

        if (this.state.reg_nombres === '') {
            console.log('WHOOPS!')
            revision = false;
        }

        if (nuevo.data.respuesta === "correcto" && revision) {

            console.log("Completado!");
            Swal.fire({
                title: 'Agregado!',
                text: "Has agregado un estudiante!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

        } else {
            console.log("Revise bien las credenciales")
        }

    }

    state = {

        modalOpen: false,

        reg_nombres: '',
        documento: '',
        correo: '',
        lugar1: '',
        fechaInicial: '',
        fechaFinal: '',
        semestre: '',

        hospitales: [],
        rotaciones: []

    }

    toggle = () => {

        this.setState({ modalOpen: !this.state.modalOpen })

    }

    render() {

        return (


            <button className="btn btn-primary" onClick={this.toggle}><FontAwesomeIcon icon="fa-solid fa-plus" />
                <div className="modal-div">
                    <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>
                        <ModalHeader toggle={this.toggle}>Agregar Estudiante</ModalHeader>
                        <ModalBody>
                            <p>En esta seccion puedes agregar a los diferentes estudiantes de la facultad de medicina,
                                puedes registrar a uno solo o agregar un archivo de excel.</p>
                            <form className='form-control text-center' onSubmit={this.handleSubmit}>

                                <h6 className="pb-2 pt-1">Información del Estudiante</h6>
                                <div className='row pb-2'>
                                    <div className='col-5'>
                                        <div className='form-floating'>
                                            <input type='text' className="form-control" id='nombres' name='nombres' placeholder='nombres' onChange={(e) => this.setState({ reg_nombres: e.target.value })} />
                                            <label htmlFor='nombres'>APELLIDO(S) NOMBRE(S)</label>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className='form-floating'>
                                            <input type='text' className="form-control" id='documento' name='documento' placeholder='nombres' onChange={(e) => this.setState({ documento: e.target.value })} />
                                            <label htmlFor='documento'>Documento Estudiante</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className='form-floating'>
                                            <select className="form-control form-select" onChange={(e) => this.setState({ semestre: e.target.value })}>

                                                <option defaultValue>Semestre...</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className='row pb-2'>
                                    <div className='form-floating'>
                                        <input type='text' className="form-control" id='correo' name='correo' placeholder='correo' onChange={(e) => this.setState({ correo: e.target.value })} />
                                        <label htmlFor='correo'> Correo Institucional</label>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-group mb-3'>
                                        <label className='input-group-text' htmlFor='archivo_foto'>Foto</label>
                                        <input type='file' className='form-control' id='archivo_foto' name='archivo_foto' />
                                    </div>

                                </div>

                                <GenerarAcordion rotaciones={this.state.rotaciones} hospitales= {this.state.hospitales} eliminarRotaciones={this.eliminarRotacion}/>

                                <hr />

                                <button type="button" className="btn btn-secondary" onClick={this.generarAcordion}>Nueva Rotacion</button>

                                <hr />

                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-primary" onClick={this.handleSubmit}>Agregar Estudiante</button>
                                    </div>
                                </div>

                            </form>

                            <hr />
                            <form className="form-control text-center">
                                <h1 className="display-6 pb-3">Subir archivo excel con los estudiantes (SALA)</h1>
                                <div className='input-group mb-3'>
                                    <label className='input-group-text' htmlFor='archivo_foto'>Archivo Excel</label>
                                    <input type='file' className='form-control' id='archivo_foto' name='archivo_foto' />
                                </div>
                                <button className="btn btn-success" type='button'>Subir</button>
                            </form>

                        </ModalBody>
                        <ModalFooter>
                            <hr />
                        </ModalFooter>
                    </Modal>
                </div>

            </button>
        );
    }
}



export default AddStudent;
