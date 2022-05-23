import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import axios from 'axios';
const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

const MostrarEstudiante = (props) => {

    const estudiante = props.estudiante;

    const guardarCambio = () => {

        console.log('SAVE')

    }

    return (
        <Modal isOpen={props.modalOpen} size='lg'>

            <ModalHeader toggle={e => props.setModal(false)}>
                Estudiante: <u>{estudiante.nombres}</u>
            </ModalHeader>

            <ModalBody>
                <div className="row">
                    <p>Estudiante: <u>{estudiante.nombres}</u></p>
                </div>

                <div className="row">
                    <p>Correo: <u>{estudiante.correo}</u></p>
                </div>
            </ModalBody>

            <ModalFooter>

                <button className="btn btn-success" onClick={guardarCambio}>Guardar</button>
                <button className="btn btn-danger" onClick={e => props.setModal(false)}>Cerrar</button>

            </ModalFooter>

        </Modal>
    );
}

export default MostrarEstudiante;
