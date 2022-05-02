import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
import Swal from 'sweetalert2';



const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

class Editarhospital extends Component {

    modificarHospital = async (e) => {
        e.preventDefault();
        let ipBuilder = ip + '/api/admin/modHsp'
        const res = await axios.post(ipBuilder,
            {
                _id: this.props.id,
                nombre_hospital: this.state.nombre_hsp,
                nombre_lider: this.state.nombre_lider,
                correo_administrador: this.state.correo,
                cupo: this.state.cupo,

            }).then(
                Swal.fire(
                    '¡Completado!',
                    '¡Se modifico el Hospital!',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            )
    }

    async componentDidMount() {

        let ipBuilder = ip + '/api/admin/unHospital'
        let res = await axios.post(ipBuilder, { _id: this.props.id })
        this.setState({ hospital: res.data });




    }

    state = {
        hospital: {},
        modalOpen: false,
        nombre_hsp: '',
        nombre_lider: '',
        cupo: 0,
        correo: '',
        estudiantes: []
    }

    toggle = () => {

        this.setState({ nombre_hsp: this.state.hospital.nombre_hospital })
        this.setState({ nombre_lider: this.state.hospital.nombre_lider })
        this.setState({ cupo: this.state.hospital.cupo })
        this.setState({ correo: this.state.hospital.correo_administrador })
        this.setState({ estudiantes: this.state.hospital.estudiantesAfiliados })
        this.setState({ modalOpen: !this.state.modalOpen })

    }

    render() {
        return (
            <button className="btn btn-primary" onClick={this.toggle} >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                <Modal isOpen={this.state.modalOpen} size="xl">
                    <ModalHeader toggle={this.toggle} >
                        <div className="display-6">Editar Hospital</div>
                    </ModalHeader>

                    <ModalBody>
                        <form className='form-control text-center'>

                            <div className="row pb-2 pt-2">
                                <div className="col-sm-6">
                                    <div className="form-floating">

                                        <input type="text" className="form-control" id="hspnombre" placeholder="hh" onChange={(e) => this.setState({ nombre_hsp: e.target.value })} value={this.state.nombre_hsp} />
                                        <label htmlFor="hspnombre">Nombre del Hospital</label>

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">

                                        <input type="text" className="form-control" id="ldnombre" placeholder="hh" onChange={(e) => this.setState({ nombre_lider: e.target.value })} value={this.state.nombre_lider} />
                                        <label htmlFor="ldnombre">Doctor a Cargo</label>

                                    </div>
                                </div>
                            </div>
                            <div className="row pb-2">
                                <div className="col-sm-6">
                                    <div className="form-floating">

                                        <input type="text" className="form-control" id="correoctn" placeholder="Correo" onChange={(e) => this.setState({ correo: e.target.value })} value={this.state.correo} />
                                        <label htmlFor="correoctn">Correo de Contacto</label>

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">

                                        <input type="number" className="form-control" id="cupo" placeholder="Correo" onChange={(e) => this.setState({ cupo: e.target.value })} value={this.state.cupo} />
                                        <label htmlFor="cupo">Cupo</label>

                                    </div>
                                </div>
                            </div>
                            <div className="row pb-2">
                                <div className="col align-self-center">

                                    <button className="btn btn-success" onClick={this.modificarHospital}>
                                        Guardar Hospital
                                    </button>

                                </div>
                            </div>

                        </form>
                    </ModalBody>

                </Modal>
            </button>
        );
    }
}

export default Editarhospital;
