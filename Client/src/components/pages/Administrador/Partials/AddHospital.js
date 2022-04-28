import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2';
import axios from 'axios';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

class AddHospital extends React.Component {

    handleSubmit = async (e) => {

        e.preventDefault();
        console.log(this.state.nombre_hsp)
        console.log(this.state.nombre_lider)
        console.log(this.state.cupo)
        console.log(this.state.correo)
        const url = ip + '/api/admin/RegisHospital';

        const nuevo = await axios.post(url, {

            nombre: this.state.nombre_hsp,
            n_lider: this.state.nombre_lider,
            correo: this.state.correo,
            cupo: this.state.cupo
        }
        );

        if (nuevo.data.registera === "complete") {

            Swal.fire({
                title: 'Agregado!',
                text: "Has agregado un hospital!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })

        }



    }

    state = {

        modalOpen: false,

        nombre_hsp: '',
        nombre_lider: '',
        cupo: 0,
        correo: ''

    }

    toggle = () => {

        this.setState({ modalOpen: !this.state.modalOpen })

    }

    render() {

        return (

            <button className="btn btn-primary" onClick={this.toggle}><FontAwesomeIcon icon="fa-solid fa-plus" />
                <div className="modal-div">
                    <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>
                        <ModalHeader toggle={this.toggle}>Agregar Hospital</ModalHeader>
                        <ModalBody>
                            <p>En esta seccion puedes agregar a diferentes hospitales por los cuales rotarán los estudiantes</p>
                            <form className='form-control text-center'>

                                <div className="row pb-2 pt-2">
                                    <div className="col-sm-6">
                                        <div className="form-floating">

                                            <input type="text" className="form-control" id="hspnombre" placeholder="hh" onChange={(e) => this.setState({ nombre_hsp: e.target.value })} />
                                            <label htmlFor="hspnombre">Nombre del Hospital</label>

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">

                                            <input type="text" className="form-control" id="ldnombre" placeholder="hh" onChange={(e) => this.setState({ nombre_lider: e.target.value })} />
                                            <label htmlFor="ldnombre">Doctor a Cargo</label>

                                        </div>
                                    </div>
                                </div>
                                <div className="row pb-2">
                                    <div className="col-sm-6">
                                        <div className="form-floating">

                                            <input type="text" className="form-control" id="correoctn" placeholder="Correo" onChange={(e) => this.setState({ correo: e.target.value })} />
                                            <label htmlFor="correoctn">Correo de Contacto</label>

                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating">

                                            <input type="number" className="form-control" id="cupo" placeholder="Correo" onChange={(e) => this.setState({ cupo: e.target.value })} />
                                            <label htmlFor="cupo">Cupo</label>

                                        </div>
                                    </div>
                                </div>
                                <div className="row pb-2">
                                    <div className="col align-self-center">

                                        <button className="btn btn-primary" onClick={this.handleSubmit}>
                                            Agregar Hospital
                                        </button>

                                    </div>
                                </div>

                            </form>

                            <hr />

                            <form action="" className="form-control text-center">

                                <h1 className="display-6 pb-3">Subir archivo excel con los Hospitales</h1>
                                <div className='input-group mb-3'>
                                    <label className='input-group-text' htmlFor='archExcel'>Archivo Excel</label>
                                    <input type='file' className='form-control' id='archExcel' name='archExcel' />
                                </div>
                                <button className="btn btn-success">Subir</button>

                            </form>

                        </ModalBody>
                        <ModalFooter>
                            <hr />
                        </ModalFooter>
                    </Modal>
                </div>
            </button>

        );
    }
}

export default AddHospital;
