import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';
export default class extends Component {

    async componentDidMount() {
        const ipBuilder = ip + '/api/admin/unHospital';
        const res = await axios.post(ipBuilder,
            { _id: this.props.id });
        this.setState({ hospital: res.data })

    }

    state = {
        modalOpen: false,
        hospital: {}
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

                            <label htmlFor="cupo" className="col-sm-2 col-form-label">Persona Acargo:</label>
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
                    </ModalBody>

                </Modal>
            </button>
        )
    }
}
