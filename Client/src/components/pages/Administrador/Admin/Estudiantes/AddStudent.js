import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

import { Accordion } from 'react-bootstrap'
import GenerarAcordion from './EstudianteRotaciones/AgregarRotacionesADD'

import Swal from 'sweetalert2';
import axios from 'axios';
import * as XLSX from 'xlsx';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

class AddStudent extends React.Component {

    async componentDidMount() {

        const ipBuilder = ip + '/api/admin/allHospital';
        const res = await axios.get(ipBuilder);
        this.setState({ hospitales: res.data });

    }

    generarAcordion = () => {

        const id_l = this.state.rotaciones.length + 1
        const nuevaRotacion = {
            id: id_l,
            hospital: '',
            fechaInicial: '',
            fechaFinal: '',
            id_hospital: '',
            nota: 'no definido'
        }

        this.setState({ rotaciones: this.state.rotaciones.concat(nuevaRotacion) })


    }

    actualizarRotacion = (e) => {

        const id = e.id;
        let rotacionesaux = this.state.rotaciones;

        for (let i = 0; i < rotacionesaux.length; i++) {

            if (rotacionesaux[i].id === id) {

                rotacionesaux[i] = e;

            }

        }

        this.setState({ rotacion: rotacionesaux });

    }

    eliminarRotacion = (e) => {
        const id = parseInt(e) - 1;
        const arrayfor = this.state.rotaciones;
        arrayfor.splice(id)
        this.setState({ rotaciones: arrayfor })
        console.log(this.state.rotaciones)
    }

    leerExcel = async (e) => {

        e.preventDefault()

        if(this.state.hospitales.length === 0){

            Swal.fire({
                title: 'No hay hospitales agregados',
                text: 'Agregue al menos un hospital',
                icon: 'error'

            })
            return;

        }

        Swal.fire({
            title: 'Subiendo Estudiantes...',
            text: 'Por favor, espere...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });

        const ipBuilder2 = ip + '/api/admin/excEstudiante';

        const file = this.state.selectedFile;
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);
        const workbookSheets = workbook.SheetNames;

        const dataExcel1 = XLSX.utils.sheet_to_json(workbook.Sheets[workbookSheets[0]],
            {
                header: ["semestre", "documento", "nombres", "promedio",
                    "correo", "telefono", "rotacionActual"]
            });

        const res = await axios.post(ipBuilder2, dataExcel1);
        Swal.close();
        this.setState({ modalOpen: false });

        this.props.actualizar();
        console.log(res)
        console.log(res.data.txrepetidos)

        if (res.data.txrepetidos !== null || res.data.errores !== null) {

            if(res.data.txrepetidos !== '' && res.data.errores !== ''){

                Swal.fire({
                    title: '¡Agregados!',
                    text: "Se han agregado algunos estudiantes excepto: " + res.data.txrepetidos,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                }).then((result) => {
                    if (result.isConfirmed) {
    
                        this.setState({ rotaciones: [] });
                        this.setState({ modalOpen: false });
                        Swal.fire({
                            title: '¡Agregados!',
                            text: "Se han agregado algunos estudiantes excepto: " + res.data.errores + ' (faltaba información)',
                            icon: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK!'
                        })
    
                    }
                })

            }

            else if(res.data.txrepetidos !== '' ){

                Swal.fire({
                    title: '¡Agregados!',
                    text: "Se han agregado algunos estudiantes excepto: " + res.data.txrepetidos,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                }).then((result) => {
                    if (result.isConfirmed) {
    
                        this.setState({ rotaciones: [] });
                        this.setState({ modalOpen: false });
                        
    
                    }
                })

            }

            else if(res.data.errores !== '') {

                Swal.fire({
                    title: '¡Agregados!',
                    text: "Se han agregado algunos estudiantes excepto: " + res.data.errores + ' (faltaba información)',
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                }).then((result) => {
                    if (result.isConfirmed) {
    
                        this.setState({ rotaciones: [] });
                        this.setState({ modalOpen: false });
    
                    }
                })

            }

        } else {
            Swal.fire({
                title: '¡Agregados!',
                text: "¡Has agregado estudiantes por excel!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {
                if (result.isConfirmed) {

                    this.setState({ rotaciones: [] });
                    this.setState({ modalOpen: false });

                }
            })
        }




    }

    handleSubmit = async (e) => {

        e.preventDefault();

        const ipBuilder = ip + '/api/admin/regisEstudiante';

        const nuevo = await axios.post(ipBuilder, {
            reg_nombres: this.state.reg_nombres,
            documento: this.state.documento,
            correo: this.state.correo,
            semestre: this.state.semestre,
            rotaciones: this.state.rotaciones,

        })
        let revision = true;

        if (this.state.reg_nombres === '') {
            console.log('WHOOPS!')
            revision = false;
        }

        if (nuevo.data.respuesta === "correcto" && revision) {


            const id_estudiante = nuevo.data.id
            const rotaciones = this.state.rotaciones;

            for (let i = 0; i < rotaciones.length; i++) {

                const ipBuilder2 = ip + '/api/admin/regisEstudianteHsp'
                const nuevoHospital = await axios.post(ipBuilder2, {
                    nombre_hospital: rotaciones[i].nombre_hospital,
                    id_est: id_estudiante
                })

                console.log(nuevoHospital.data);

            }
            this.props.actualizar();
            console.log("Completado!");
            Swal.fire({
                title: 'Agregado!',
                text: "¡Has agregado un estudiante!",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {
                if (result.isConfirmed) {

                    this.setState({ rotaciones: [] });
                    this.setState({ modalOpen: false });


                }
            })

        } else {
            console.log("Revise bien las credenciales")
        }


    }

    state = {

        modalOpen: false,

        reg_nombres: '',
        documento: '',
        correo: '',
        lugar1: '',
        fechaInicial: '',
        fechaFinal: '',
        semestre: '',

        hospitales: [],
        rotaciones: [],

        selectedFile: null

    }

    toggle = () => {

        this.setState({ modalOpen: !this.state.modalOpen })
        this.setState({ rotaciones: [] });

    }

    render() {



        return (


            <button className="btn btn-primary" onClick={this.toggle}><FontAwesomeIcon icon="fa-solid fa-plus" />
                <div className="modal-div">
                    <Modal isOpen={this.state.modalOpen} className="modal-class" size='xl'>
                        <ModalHeader toggle={this.toggle}>Agregar Estudiante</ModalHeader>
                        <ModalBody>
                            <p>En esta seccion puedes agregar a los diferentes estudiantes de la facultad de medicina,
                                puedes registrar a un solo estudiante o agregar un archivo de excel.</p>
                            <form className='form-control text-center'>

                                <h6 className="pb-2 pt-1">Información del Estudiante</h6>
                                <div className='row pb-2'>
                                    <div className='col-5'>
                                        <div className='form-floating'>
                                            <input type='text' className="form-control" id='nombres' name='nombres' placeholder='nombres' onChange={(e) => this.setState({ reg_nombres: e.target.value })} />
                                            <label htmlFor='nombres'>APELLIDO(S) NOMBRE(S)</label>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className='form-floating'>
                                            <input type='text' className="form-control" id='documento' name='documento' placeholder='nombres' onChange={(e) => this.setState({ documento: e.target.value })} />
                                            <label htmlFor='documento'>Documento Estudiante</label>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className='form-floating'>
                                            <select className="form-control form-select" onChange={(e) => this.setState({ semestre: e.target.value })}>

                                                <option defaultValue>Semestre...</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>

                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className='row pb-2'>
                                    <div className='form-floating'>
                                        <input type='text' className="form-control" id='correo' name='correo' placeholder='correo' onChange={(e) => this.setState({ correo: e.target.value })} />
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

                                <div className="pb-3">

                                    <Accordion>

                                        {
                                            this.state.rotaciones.map((e) => (



                                                <GenerarAcordion

                                                    rotacion={e}
                                                    hospitales={this.state.hospitales}

                                                    actualizarRotacion={this.actualizarRotacion}
                                                    eliminarRotacion={this.eliminarRotacion}
                                                    key={e.id}

                                                />

                                            ))
                                        }
                                    </Accordion>

                                </div>

                                <button type="button" className="btn btn-warning" onClick={this.generarAcordion}>Nueva Rotación</button>
                                <hr />

                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-primary" onClick={this.handleSubmit}>Agregar Estudiante</button>
                                    </div>
                                </div>

                            </form>

                            <hr />
                            <form className="form-control text-center" onSubmit={(e) => this.leerExcel(e)}>
                                <h1 className="display-6 pb-3">Subir archivo excel con los estudiantes (SALA)</h1>
                                <p>Si no conoces con qué formato subir los datos da <Link to="/files/Formato_Estudiantes.xlsx" target="_blank" download>click aquí</Link></p>
                                <div className='input-group mb-3'>
                                    <label className='input-group-text' htmlFor='archivo_foto'>Archivo Excel</label>
                                    <input type='file' className='form-control' id='archivo_foto' name='archivo_foto' onChange={(e) => this.setState({ selectedFile: e.target.files[0] })} />
                                </div>
                                <button className="btn btn-success" >Subir</button>
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



export default AddStudent;
