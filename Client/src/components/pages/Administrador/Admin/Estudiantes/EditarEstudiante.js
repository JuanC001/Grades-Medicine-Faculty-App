import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion } from 'react-bootstrap'

import EditarRotaciones from './EstudianteRotaciones/EditarRotaciones'

import Swal from 'sweetalert2';
import axios from 'axios';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

class EditarEstudiante extends React.Component {

    generarAcordion = () => {

        console.log('----------generarAcordion')
        const id_l = this.state.rotaciones.length + 1
        const nuevaRotacion = {
            id: id_l,
            hospital: '',
            fechaInicial: '',
            fechaFinal: '',
            id_hospital: '',
            nota: 'no definido',
        }

        this.setState({ rotaciones: this.state.rotaciones.concat(nuevaRotacion) })
        console.log('----------generarAcordion')


    }

    eliminarRotacion = (e) => {
        const id = parseInt(e) - 1;
        const arrayfor = this.state.rotaciones;
        arrayfor.splice(id)
        this.setState({ rotaciones: arrayfor })
        console.log(this.state.rotaciones)
    }

    actualizarRotacion = (e) => {

        const id = e.id;
        let rotacionesaux = this.state.rotaciones;

        for (let i = 0; i < rotacionesaux.length; i++) {

            if (rotacionesaux[i].id === id) {

                rotacionesaux[i] = e;

            }

        }

        this.setState({ rotacion: rotacionesaux });

    }

    modificarEstudiante = async (e) => {

        e.preventDefault();
        console.log('MODIFICANDO!');
        let ipBuilder = ip + '/api/admin/modEst'
        const res = await axios.post(ipBuilder,
            {
                _id: this.props.id,
                ed_nombres: this.state.ed_nombres,
                documento: this.state.documento,
                correo: this.state.correo,
                semestre: this.state.semestre,
                rotaciones: this.state.rotaciones,

            })
        console.log(res.data);
        const id_estudiante = this.props.id
        const rotaciones = this.state.rotaciones;
        for (let i = 0; i < rotaciones.length; i++) {

            const ipBuilder2 = ip + '/api/admin/regisEstudianteHsp'
            const nuevoHospital = await axios.post(ipBuilder2, {
                nombre_hospital: rotaciones[i].nombre_hospital,
                id_est: id_estudiante
            })

            console.log('HOSPITAL ACUTIALIZADO: ' + nuevoHospital.data);

        }

        Swal.fire(
            '¡Completado!',
            'Se modifico al estudiante',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                this.setState({ modalOpen: false });
            }
        })


        this.props.actualizar();

    }

    async componentDidMount() {

        let ipBuilder = ip + '/api/admin/unEstudiante';
        let res = await axios.post(ipBuilder, { _id: this.props.id })
        this.setState({ estudiante: res.data });
        const est = res.data;
        this.setState({ rotaciones: est.rotaciones });

        ipBuilder = ip + '/api/admin/allHospital';
        res = await axios.get(ipBuilder);
        this.setState({ hospitales: res.data });

    }

    state = {

        modalOpen: false,
        estudiante: {},
        hospitales: [],
        rotaciones: [],

        ed_nombres: '',
        documento: '',
        correo: '',
        semestre: '',



    }

    toggle = () => {

        this.setState({ ed_nombres: this.state.estudiante.nombres });
        this.setState({ documento: this.state.estudiante.documento });
        this.setState({ correo: this.state.estudiante.correo });
        this.setState({ semestre: this.state.estudiante.semestre });
        this.setState({ modalOpen: !this.state.modalOpen })

    }

    render() {
        return (

            <button className="btn btn-primary" onClick={this.toggle}>

                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>
                    <ModalHeader toggle={this.toggle}>


                    </ModalHeader>
                    <ModalBody>
                        <form className='form-control text-center' onSubmit={this.handleSubmit}>

                            <h6 className="pb-2 pt-1">Información del Estudiante</h6>
                            <div className='row pb-2'>
                                <div className='col-5'>
                                    <div className='form-floating'>
                                        <input type='text' className="form-control" id='nombres' name='nombres' placeholder='nombres' value={this.state.ed_nombres} onChange={(e) => this.setState({ ed_nombres: e.target.value })} />
                                        <label htmlFor='nombres'>APELLIDO(S) NOMBRE(S)</label>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className='form-floating'>
                                        <input type='text' className="form-control" id='documento' name='documento' placeholder='nombres' value={this.state.documento} onChange={(e) => this.setState({ documento: e.target.value })} />
                                        <label htmlFor='documento'>Documento Estudiante</label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className='form-floating'>
                                        <select className="form-control form-select" value={this.state.semestre} onChange={(e) => this.setState({ semestre: e.target.value })}>

                                            <option defaultValue>Semestre...</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>

                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className='row pb-2'>
                                <div className='form-floating'>
                                    <input type='text' className="form-control" id='correo' name='correo' placeholder='correo' value={this.state.correo} onChange={(e) => this.setState({ correo: e.target.value })} />
                                    <label htmlFor='correo'> Correo Institucional</label>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='input-group mb-3'>
                                    <label className='input-group-text' htmlFor='archivo_foto'>Foto</label>
                                    <input type='file' className='form-control' id='archivo_foto' name='archivo_foto' />
                                </div>

                            </div>

                            <hr />

                            <Accordion className="mb-2">
                                {

                                    this.state.rotaciones.map(e => (

                                        <EditarRotaciones key={e.id}
                                            rotacion={e}
                                            hospitales={this.state.hospitales}
                                            actualizarRotacion={this.actualizarRotacion}
                                            eliminarRotacion={this.eliminarRotacion}
                                        />

                                    ))

                                }
                            </Accordion>

                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-warning" onClick={this.generarAcordion}>Nueva Rotacion</button>
                                </div>
                            </div>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-success" onClick={this.modificarEstudiante}>Guardar</button>
                            </div>

                            <div className="col">
                                <button className="btn btn-danger" onClick={this.toggle}>Cerrar</button>
                            </div>

                        </div>
                    </ModalFooter>
                </Modal>


            </button>

        )
    }

}

export default EditarEstudiante;