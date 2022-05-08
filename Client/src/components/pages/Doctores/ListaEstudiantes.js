import React from 'react'
import './CSS/LE.css';

export default function ListaEstudiantes() {
    return (
        <div className="card mb-3 shadow-sm">

            <div className="card-header">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-2 text-end ">Estudiante:</div>
                        <div className="col text-start ">NOMBRE_ESTUDIANTE</div>
                        <div className="col text-end">CC:</div>
                        <div className="col text-start">1023304713</div>

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

                                    <p htmlFor="" className="col-form-label text-start">CORREO</p>

                                </div>

                                <div className="col">
                                    <label htmlFor="" className="col-form-label">Semestre:</label>
                                </div>
                                <div className="col">

                                    <p htmlFor="" className="col-form-label text-start">SEMESTRE</p>

                                </div>

                            </div>
                        </li>
                        <li className="list-group-item active">
                            <div className="row">
                                <div className="col">
                                    <label>Rotacion Actual:</label>
                                </div>
                                <div className="col">
                                    <label htmlFor="">ROT_ACTUAL</label>
                                </div>
                                <div className="col">
                                    <label htmlFor="">Area Actual:</label>
                                </div>
                                <div className="col"> <u>Area del estudiante</u></div>
                            </div>
                        </li>
                    </div>

                </div>
            </div>

        </div>
    )
}
