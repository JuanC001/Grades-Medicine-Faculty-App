import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion } from 'react-bootstrap'

import Swal from 'sweetalert2';
import axios from 'axios';

const ip = 'http://192.168.50.141:5000';

class EditarEstudiante extends React.Component {

    async componentDidMount() {
        let ipBuilder = ip + '/api/admin/unEstudiante';
        let res = await axios.post(ipBuilder, { _id: this.props.id })
        this.setState({ estudiante: res.data });
        const estudiantef = res.data;
        this.setState({ rotacion1: estudiantef.rotacion1 })
        this.setState({ rotacion2: estudiantef.rotacion2 })
        this.setState({ rotacion3: estudiantef.rotacion3 })
        this.setState({ rotacion4: estudiantef.rotacion4 })
        this.setState({ rotacion5: estudiantef.rotacion5 })
        this.setState({ rotacion6: estudiantef.rotacion6 })
        ipBuilder = ip + '/api/admin/allHospital';
        res = await axios.get(ipBuilder);
        this.setState({ hospitales: res.data });


    }

    state = {

        modalOpen: false,
        estudiante: {},
        hospitales: [],

        reg_nombres: '',
        documento: '',
        correo: '',
        lugar1: '',
        fechaInicial: '',
        fechaFinal: '',
        semestre: '',

        rotacion1: {},
        rotacion2: {},
        rotacion3: {},
        rotacion4: {},
        rotacion5: {},
        rotacion6: {}


    }

    toggle = () => {

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
                                        <input type='text' className="form-control" id='nombres' name='nombres' placeholder='nombres' value={this.state.estudiante.nombres} onChange={(e) => this.setState({ reg_nombres: e.target.value })} />
                                        <label htmlFor='nombres'>APELLIDO(S) NOMBRE(S)</label>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className='form-floating'>
                                        <input type='text' className="form-control" id='documento' name='documento' placeholder='nombres' value={this.state.estudiante.documento} onChange={(e) => this.setState({ documento: e.target.value })} />
                                        <label htmlFor='documento'>Documento Estudiante</label>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className='form-floating'>
                                        <select className="form-control form-select" value={this.state.estudiante.semestre} onChange={(e) => this.setState({ semestre: e.target.value })}>

                                            <option defaultValue>Semestre...</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>

                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className='row pb-2'>
                                <div className='form-floating'>
                                    <input type='text' className="form-control" id='correo' name='correo' placeholder='correo' value={this.state.estudiante.correo} onChange={(e) => this.setState({ correo: e.target.value })} />
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
                                    <Accordion.Header>Rotacion 1: {this.state.rotacion1.lugar}</Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-group">
                                            <li className="list-group-item">

                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">Fecha Inicial:</label>
                                                    </div>
                                                    <div className="col">
                                                        {this.state.rotacion1.fechaInicial}
                                                    </div>
                                                </div>

                                            </li>
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">Fecha Final:</label>
                                                    </div>
                                                    <div className="col">
                                                        {this.state.rotacion1.fechaFinal}
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="list-group-item active">
                                            <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="">Nota:</label>
                                                    </div>
                                                    <div className="col">
                                                        {this.state.rotacion1.nota}
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Rotacion 2: {this.state.rotacion2.lugar}</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <div>
                                <div className="col">
                                    <button className="btn btn-primary" onClick={this.handleSubmit}>Guardar Estudiante</button>
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