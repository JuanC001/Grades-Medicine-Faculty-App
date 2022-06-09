import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion } from 'react-bootstrap'

import EstudianteAfiliado from './EstudianteAfiliado';

export default class MostrarHospital extends Component {


    state = {
        modalOpen: false,
        hospital: this.props.hsp,
        estudiantes: this.props.hsp.estudiantesAfiliados
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    render() {
        return (
            <button className="btn btn-primary" onClick={this.toggle}><FontAwesomeIcon icon="fa-solid fa-eye" />
                <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>

                    <ModalHeader toggle={this.toggle}>
                        Información de: {this.state.hospital.nombre_hospital}
                    </ModalHeader>

                    <ModalBody>
                        <div className="row">

                            <label htmlFor="cupo" className="col-sm-2 col-form-label">Persona a cargo:</label>
                            <div className="col-sm-7">
                                <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={this.state.hospital.nombre_lider} />

                            </div>

                        </div>

                        <div className="row">

                            <label htmlFor="cupo" className="col-sm-2 col-form-label">Correo de Contacto:</label>
                            <div className="col-sm-7">
                                <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={this.state.hospital.correo_administrador} />

                            </div>

                        </div>

                        <hr />

                        <div className="row">

                            <h6 className="display-6">Lista de estudiantes</h6>

                            {
                                
                                <Listas estudiantes = {this.state.estudiantes} hospital= {this.state.hospital}/>

                            }


                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <button className="btn btn-danger" onClick={(e) => this.setState({ modalOpen: false })}>Cerrar</button>

                    </ModalFooter>

                </Modal>
            </button>
        )
    }
}

function Listas(props){

    const {estudiantes, hospital} = props;

    if(estudiantes.length > 0){

        return estudiantes.map(e =>
            <Accordion>
                <EstudianteAfiliado est={e} key={e} hsp_id= {hospital._id}/>
            </Accordion>
        )

    }

    return <div className="text-center">No hay estudiantes aun</div>

    
}
