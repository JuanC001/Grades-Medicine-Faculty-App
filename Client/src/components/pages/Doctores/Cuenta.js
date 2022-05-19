import React, { useState } from 'react'
import DoctorNavigation from './partials/DoctorNavigation'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export default function Cuenta(props) {

    const [modalOpen, setModalOpen] = useState(false)

    const[contrasenaActual, setContrasenaActual] = useState('')
    const[contrasenaNueva, setContrasenaNueva] = useState('')
    const[contrasenaRepetida, setContrasenaRepetida] = useState('')

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
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={props.user.user} />
                        </div>
                    </div>

                    <div class="mb-1 row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Nombre:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={props.user.nombre} />
                        </div>
                    </div>

                    <div class="mb-1 row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Hospital a cargo:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={props.user.hospital} />
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
                        <label for="primeraContraseña" class="col-sm-4 col-form-label text-end" >Contraseña Actual:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="primeraContraseña" onChange= {(e) => setContrasenaActual(e.target.value)} />
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="segundaContraseña" class="col-sm-4 col-form-label text-end">Contraseña Nueva:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="segundaContraseña" onChange= {(e) => setContrasenaNueva(e.target.value)}/>
                        </div>
                    </div>

                    <div class="mb-3 row">
                        <label for="segundaContraseña" class="col-sm-4 col-form-label text-end">Repita Contraseña:</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="segundaContraseña" onChange= {(e) => setContrasenaRepetida(e.target.value)}/>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col text-center">
                            <button className="btn-success btn">
                                Guardar
                            </button>
                        </div>

                    </div>

                </ModalBody>

            </Modal>

        </div>
    )
}
