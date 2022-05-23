import React, { useState } from 'react'
import './CSS/LE.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import MostrarEstudiante from './partials/MostrarEstudiante';

export default function ListaEstudiantes(props) {

    const [verStudiante, setVerStudiante] = useState(false);

    return (
        <div className="card mb-3 shadow-sm">

            <div className="card-header">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-2 text-end ">Estudiante:</div>
                        <div className="col text-start ">{props.estudiante.nombres}</div>
                        <div className="col text-end">CC:</div>
                        <div className="col text-start">{props.estudiante.documento}</div>

                    </div>
                </div>
            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-sm-2">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="hola" className="cardimg" />
                    </div>

                    <div className="col-sm-9">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="" className="col-form-label">Correo:</label>
                                </div>
                                <div className="col">

                                    <p htmlFor="" className="col-form-label text-start">{props.estudiante.correo}</p>

                                </div>

                                <div className="col">
                                    <label htmlFor="" className="col-form-label">Semestre:</label>
                                </div>
                                <div className="col">

                                    <p htmlFor="" className="col-form-label text-start">{props.estudiante.semestre}</p>

                                </div>

                            </div>
                        </li>
                        <li className="list-group-item active">
                            <div className="row">
                                <div className="col">
                                    <label>Rotacion Actual:</label>
                                </div>
                                <div className="col">
                                    <label htmlFor="">{props.estudiante.rotacionActual}</label>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Area Actual:</label>
                                </div>
                                <div className="col"> <u>Area del estudiante</u></div>

                            </div>
                        </li>
                    </div>

                    <div className="col-sm-1">

                        <button className="btn btn-primary" onClick={e => setVerStudiante(true)}><FontAwesomeIcon icon="fa-solid fa-eye" /></button>

                    </div>

                    asdf {props.hsp_id}

                    <MostrarEstudiante modalOpen={verStudiante} setModal={setVerStudiante} estudiante={props.estudiante} />

                </div>
            </div>

        </div>
    )
}
