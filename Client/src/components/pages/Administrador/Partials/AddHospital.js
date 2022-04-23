import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddStudent extends React.Component {

    constructor(props) {

        super(props);

    }

    state = {

        modalOpen: false

    }

    toggle = () => {

        this.setState({ modalOpen: !this.state.modalOpen })

    }

    render() {

        return (

            <div>
                <button className="btn btn-primary" onClick={this.toggle}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                <div className="modal-div">
                    <Modal isOpen={this.state.modalOpen} nameClass="modal-class" size='xl'>
                        <ModalHeader toggle={this.toggle}>Agregar Estudiante</ModalHeader>
                        <ModalBody>
                            <p>En esta seccion puedes agregar a los diferentes estudiantes de la facultad de medicina,
                                puedes registrar a uno solo o agregar un archivo de excel.</p>
                            <form className='form-control text-center'>

                                <h6 className="pb-2 pt-1">Información del Estudiante</h6>
                                <div className='row pb-2'>
                                    <div className='col-5'>
                                        <div className='form-floating'>
                                            <input type='text' className="form-control" id='nombres' name='nombres' placeholder='nombres' />
                                            <label htmlFor='nombres'>Nombres</label>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className='form-floating'>
                                            <input type='text' className="form-control" id='documento' name='documento' placeholder='nombres' />
                                            <label htmlFor='documento'>Documento Estudiante</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className='form-floating'>
                                            <select className="form-control form-select">

                                                <option selected>Semestre...</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className='row pb-2'>
                                    <div className='form-floating'>
                                        <input type='text' className="form-control" id='correo' name='correo' placeholder='correo' />
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
                                <h6 className="pb-2">Sitio de Practica</h6>

                                <div className="row pb-2">

                                    <div className="col-4 input-group mb-3">

                                        <label className="input-group-text" htmlFor="hspselect">Hospital</label>
                                        <select className="form-select" id='hspselect'>

                                            <option selected>Hospital Inicial...</option>
                                            <option value="H1">Hsp 1</option>
                                            <option value="H2">Hsp 2</option>

                                        </select>


                                    </div>

                                </div>
                                <div className="row pb-2">
                                    <div className="col">

                                        <div className='input-group input-group-sm mb-3'>
                                            <label className="input-group-text" htmlFor="date1">Fecha Inicial</label>
                                            <input className='px-1' type="date" id='date1' name="date1"></input>

                                        </div>
                                    </div>

                                    <div className="col">

                                        <div className='input-group input-group-sm mb-3'>
                                            <label className="input-group-text" htmlFor="date2">Fecha Final</label>
                                            <input className='px-1' type="date" id='date2' name="date2"></input>

                                        </div>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-primary">
                                            Agregar Estudiante
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <hr />
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default AddStudent;
