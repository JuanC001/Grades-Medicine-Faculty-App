import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Swal from 'sweetalert2';
import axios from 'axios';


export default class MostrarEstudiante extends React.Component {

    clickButtonTask = () => {
        console.log(this.props.id);
    }

    async componentDidMount() {
        const res = await axios.post('http://localhost:5000/api/admin/unEstudiante',
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
                <button onClick={this.toggle} className="btn btn-primary w-50"><FontAwesomeIcon icon="fa-solid fa-eye" /></button>
                <Modal isOpen={this.state.modalOpen} className="modal-class" >
                
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
                </Modal>
            </div>

        )
    }
}
