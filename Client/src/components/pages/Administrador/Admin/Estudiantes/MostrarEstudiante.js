import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MostrarRotaciones from './EstudianteRotaciones/MostrarRotaciones'

import axios from 'axios';
const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default class MostrarEstudiante extends React.Component {

    clickButtonTask = () => {
        console.log(this.props.id);
    }

    async actualizarEstudiante() {

        const ipBuilder = ip + '/api/admin/unEstudiante';
        const res = await axios.post(ipBuilder,
            { _id: this.props.id });

        const est = res.data;

        this.setState({ estudiante: est });
        this.setState({ rotaciones: est.rotaciones });

    }

    state = {
        modalOpen: false,
        estudiante: {},
        rotaciones: []
    }

    toggle = () => {
        this.actualizarEstudiante();
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle} className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-eye" /></button>
                <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>

                    <ModalHeader toggle={this.toggle}>Informacion de {this.state.estudiante.nombres}</ModalHeader>
                    <ModalBody>
                        <p>En esta seccion puedes ver la informacion del estudiante indicado:</p>

                        <p>Nombre: {this.state.estudiante.nombres} </p>
                        <p>Correo: {this.state.estudiante.correo} </p>
                        <p>Documento: {this.state.estudiante.documento} </p>
                        <h1 className="display-6">Lista de rotaciones:</h1>
                        <MostrarRotaciones rotaciones={this.state.rotaciones} estudiante = {this.state.estudiante}/>


                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={(e) => this.setState({ modalOpen: false })}>Cerrar</button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
