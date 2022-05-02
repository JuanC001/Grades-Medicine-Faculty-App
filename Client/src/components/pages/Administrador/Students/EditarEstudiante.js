import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion } from 'react-bootstrap'

import Swal from 'sweetalert2';
import axios from 'axios';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

class EditarEstudiante extends React.Component {

    modificarEstudiante = async (e) => {

        e.preventDefault();

        let ipBuilder = ip + '/api/admin/modEst'
        const res = await axios.post(ipBuilder,
            {
                _id: this.props.id,
                ed_nombres: this.state.ed_nombres,
                documento: this.state.documento,
                correo: this.state.correo,
                semestre: this.state.semestre,

            }).then(
                Swal.fire(
                    '¡Completado!',
                    'Se modifico al estudiante',
                    'success'
                ).then((result) => {
                    if(result.isConfirmed){
                        window.location.reload(false);
                    }
                })
            )

    }

    async componentDidMount() {
        let ipBuilder = ip + '/api/admin/unEstudiante';
        let res = await axios.post(ipBuilder, { _id: this.props.id })
        this.setState({ estudiante: res.data });

        ipBuilder = ip + '/api/admin/allHospital';
        res = await axios.get(ipBuilder);
        this.setState({ hospitales: res.data });


    }

    state = {

        modalOpen: false,
        estudiante: {},
        hospitales: [],

        ed_nombres: '',
        documento: '',
        correo: '',
        semestre: '',



    }

    toggle = () => {
        console.log('toggle')
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
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header></Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group">
                                            <li className="list-group-item">

                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">Fecha Inicial:</label>
                                                    </div>
                                                    <div className="col">
                                                        fecha i
                                                    </div>
                                                </div>

                                            </li>
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">Fecha Final:</label>
                                                    </div>
                                                    <div className="col">
                                                        fecha f
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item active">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">Nota:</label>
                                                    </div>
                                                    <div className="col">
                                                        nota
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Rot 1</Accordion.Header>
                                    <Accordion.Body>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <div>
                                <div className="col">
                                    <button className="btn btn-success" onClick={this.modificarEstudiante}>Guardar Estudiante</button>
                                </div>

                            </div>

                        </form>
                    </ModalBody>
                </Modal>


            </button>

        )
    }

}

export default EditarEstudiante;