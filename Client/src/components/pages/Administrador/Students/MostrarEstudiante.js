import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
const ip = 'http://'+ process.env.REACT_APP_URL_API+ ':5000';

export default class MostrarEstudiante extends React.Component {

    clickButtonTask = () => {
        console.log(this.props.id);
    }

    async componentDidMount() {
        const ipBuilder = ip + '/api/admin/unEstudiante';
        const res = await axios.post(ipBuilder,
            { _id: this.props.id });
        this.setState({ estudiante: res.data });
        const estudiantef = res.data;
        this.setState({rotacion1: estudiantef.rotacion1})
        this.setState({rotacion2: estudiantef.rotacion2})
        this.setState({rotacion3: estudiantef.rotacion3})
        this.setState({rotacion4: estudiantef.rotacion4})
        this.setState({rotacion5: estudiantef.rotacion5})
        this.setState({rotacion6: estudiantef.rotacion6})
    }

    state = {
        modalOpen: false,
        estudiante: {},
        rotacion1 : {},
        rotacion2 : {},
        rotacion3 : {},
        rotacion4 : {},
        rotacion5 : {},
        rotacion6 : {},
    }

    toggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    render() {
        return (
            <div>
                <button onClick={this.toggle} className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-eye" /></button>
                <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>
                
                <ModalHeader toggle= {this.toggle}>Informacion de {this.state.estudiante.nombres}</ModalHeader>
                <ModalBody>
                    <p>En esta seccion puedes ver la informacion del estudiante indicado:</p>

                    <p>Nombre: {this.state.estudiante.nombres} </p>
                    <p>Correo: {this.state.estudiante.correo} </p>
                    <p>Documento: {this.state.estudiante.documento} </p>
                    <p>Rotacion 1: </p>
                    <ul>
                        <li>Lugar : {this.state.rotacion1.lugar}</li>
                        <li>Fecha de Inicio : {this.state.rotacion1.fechaInicial}</li>
                        <li>Fecha de Fin : {this.state.rotacion1.fechaFinal}</li>
                    </ul>
               


                </ModalBody>
                <ModalFooter>
                    
                </ModalFooter>
                </Modal>
            </div>

        )
    }
}
