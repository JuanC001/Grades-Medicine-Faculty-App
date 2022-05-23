import React, { useState } from 'react'
import DoctorNavigation from './partials/DoctorNavigation'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import axios from 'axios'
import Swal from 'sweetalert2';


const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default function Cuenta(props) {

    const [modalOpen, setModalOpen] = useState(false)

    const [contrasenaActual, setContrasenaActual] = useState('')
    const [contrasenaNueva, setContrasenaNueva] = useState('')
    const [contrasenaRepetida, setContrasenaRepetida] = useState('')

    const enviarFormulario = async (e) => {
        e.preventDefault();
        const ipBuilder = ip + '/api/doctor/cambiarPass';

        if (contrasenaNueva === contrasenaRepetida && contrasenaActual !== '' && contrasenaNueva !== '' && contrasenaRepetida !== '') {
            const res = await axios.post(ipBuilder, {

                id: props.user.id,
                pass: contrasenaActual,
                npass: contrasenaNueva

            })

            if (res.data.confirmado === true) {

                Swal.fire({
                    title: 'Contraseña cambiada!!',
                    text: "",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                }).then((result) => {
                    if (result.isConfirmed) {

                        toggle();

                    }
                })

            } else {

                Swal.fire({
                    title: 'Revisa las contraseñas',
                    text: "",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK!'
                })

            }

        } else {

            Swal.fire({
                title: 'Revisa las contraseñas',
                text: "Whoops algo salio mal!",
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            })

        }



    }

    let toggle = () => {
        setModalOpen(!modalOpen)
        setContrasenaActual('')
        setContrasenaNueva('')
        setContrasenaRepetida('')
    }

    return (
        <div className="lista">
            <div className="pt-4">
                <DoctorNavigation setstatemt={props.setstatemt} />
                <div className="container-fluid bg-light w-25 border rounded rounded-3">

                    <h1 className="display-3 text-center pt-3">Cuenta:</h1>
                    <hr />

                    <div class="mb-1 row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Email:</label>
                        <div class="col-sm-10">
                            <input type="text" readOnly class="form-control-plaintext" id="staticEmail" value={props.user.user} />
                        </div>
                    </div>

                    <div class="mb-1 row">
                        <label for="name" class="col-sm-3 col-form-label">Nombre:</label>
                        <div class="col-sm-10">
                            <input type="text" readOnly class="form-control-plaintext" id="name" value={props.user.nombre} />
                        </div>
                    </div>

                    <div class="mb-1 row">
                        <label for="hsp" class="col-sm-3 col-form-label">Hospital a cargo:</label>
                        <div class="col-sm-10">
                            <input type="text" readOnly class="form-control-plaintext" id="hsp" value={props.user.hospital} />
                        </div>
                    </div>

                    <div className="mt-3 mb-2 row text-center">
                        <div className="col">
                            <button className="btn btn-primary" onClick={toggle}>Editar contraseña</button>
                        </div>
                    </div>

                </div>

            </div>

            <Modal isOpen={modalOpen} size='lg'>

                <ModalHeader toggle={toggle}>Cambiar Contraseña</ModalHeader>
                <ModalBody>
                    <div class="mb-3 row">
                        <label htmlFor="primeraContraseña" class="col-sm-4 col-form-label text-end" >Contraseña Actual:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="primeraContraseña" onChange={(e) => setContrasenaActual(e.target.value)} />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label htmlFor="segundaContraseña" class="col-sm-4 col-form-label text-end">Contraseña Nueva:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="segundaContraseña" onChange={(e) => setContrasenaNueva(e.target.value)} />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label htmlFor="segundaContraseña2" class="col-sm-4 col-form-label text-end">Repita Contraseña:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="segundaContraseña2" onChange={(e) => setContrasenaRepetida(e.target.value)} />
                        </div>
                    </div>

                    <div className="row">

                        <div className="col text-center">
                            <button className="btn-success btn" onClick={enviarFormulario}>
                                Guardar
                            </button>
                        </div>

                    </div>

                </ModalBody>

            </Modal>

        </div>
    )
}
