import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom'

import * as XLSX from 'xlsx';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':' + process.env.REACT_APP_PORT_API;

class AddHospital extends React.Component {

    handleExcel = async (e) => {

        e.preventDefault();
        Swal.fire({
            title: 'Subiendo Hospitales...',
            html: 'Por favor, espere...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        const ipBuilder = ip + '/api/admin/excHospital';

        const file = this.state.selectedFile;
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);
        const workbookSheets = workbook.SheetNames;

        const dataexcel = XLSX.utils.sheet_to_json(workbook.Sheets[workbookSheets[0]],
            {
                header: ['nombre_hospital', 'nombre_lider', 'telefono', 'correo_administrador', 'cupo']
            }

        )

        console.log(dataexcel);

        const res = await axios.post(ipBuilder, dataexcel);
        Swal.close();
        console.log(res.data);
        this.props.actualizar()
        this.setState({ modalOpen: false });
        Swal.fire({
            title: '¡Agregados!',
            text: "Se han agregado los hospitales",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK!'
        })

    }

    handleSubmit = async (e) => {

        e.preventDefault();
        console.log(this.state.nombre_hsp)
        console.log(this.state.nombre_lider)
        console.log(this.state.cupo)
        console.log(this.state.correo)
        const url = ip + '/api/admin/RegisHospital';
        const url2 = ip + '/api/admon/addUsuario'



        const nuevo = await axios.post(url, {

            nombre: this.state.nombre_hsp,
            n_lider: this.state.nombre_lider,
            correo: this.state.correo,
            cupo: this.state.cupo
        }
        );

        const user = {

            nombre: this.state.nombre_lider,
            user: this.state.correo,
            password: this.state.nombre_hsp + this.state.cupo,
            email: this.state.correo,
            rol: 'doctor',
            hospital: this.state.nombre_hsp

        }

        await axios.post(url2, user)

        if (nuevo.data.registera === "complete") {

            Swal.fire({
                title: '¡Agregado!',
                text: "Has agregado un hospital!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.setState({ modalOpen: false });
                    this.props.actualizar()
                }
            })

        }



    }

    state = {

        modalOpen: false,

        nombre_hsp: '',
        nombre_lider: '',
        cupo: 0,
        correo: '',
        selectedFile: null

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
                            <p>En esta sección puedes agregar a diferentes hospitales por los cuales rotarán los estudiantes</p>
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

                            <form className="form-control text-center" onSubmit={e => this.handleExcel(e)}>

                                <h1 className="display-6 pb-3">Subir archivo Excel con los Hospitales</h1>

                                <p>Si no conoces con qué formato subir los datos da <Link to="/files/Formato_Hospitales.xlsx" target="_blank" download>click aquí</Link></p>

                                <div className='input-group mb-3'>
                                    <label className='input-group-text' htmlFor='archExcel'>Archivo Excel</label>
                                    <input type='file' className='form-control' id='archExcel' name='archExcel' onChange={e => this.setState({ selectedFile: e.target.files[0] })} />
                                </div>
                                <button className="btn btn-success" type='submit'>Subir</button>

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
