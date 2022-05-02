import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Swal from 'sweetalert2';

import Editarhospital from './EditarHospital';
import MostrarHospital from './MostrarHospital';

export default function ListaHospitales(props) {

    const id_hsp = props.hsp._id;
    const ip = 'http://'+ process.env.REACT_APP_URL_API+ ':5000';

    const eliminarHospital = async (e) => {
        const ipBuilder = ip + '/api/admin/eliminarHospital';
        await axios.post(ipBuilder, {_id: id_hsp})

    }

    const askEliminarHospital = (e) => {

        e.preventDefault();
        Swal.fire({
            title: `¿Seguro que quieres eliminar a ${props.hsp.nombre_hospital}?`,
            text: "¡Esto no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!'
          }).then((result) => {

            if(result.isConfirmed){

                eliminarHospital();
                Swal.fire('¡Eliminado!','Se borro al hospital','success').then((result) => {
                    if(result.isConfirmed){
                        props.actualizar()
                    }
                })

            }

          });    
            
    }

    return (

        <div className="card mb-3 shadow-sm">
            <div className="card-header">
                <h1 className="mt-1 mb-1 display-6 card-title">{props.hsp.nombre_hospital}</h1>

            </div>
            <div className="card-body">

                <div className="row border">
                    <label htmlFor="nombreL" className="col-sm-3 col-form-label">Doctor a Cargo:</label>
                    <div className="col-sm-5">
                        <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={props.hsp.nombre_lider} />
                    </div>

                    <label htmlFor="cupo" className="col-sm-2 col-form-label">Cupo:</label>
                    <div className="col-sm-1">
                        <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={props.hsp.cupo} />
                    </div>

                </div>

                <div className="row border">
                    <label htmlFor="nombreL" className="col-sm-3 col-form-label">Correo</label>
                    <div className="col-sm-5">
                        <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={props.hsp.correo_administrador} />
                    </div>
                    <label htmlFor="cupo" className="col-sm-2 col-form-label">Estudiantes Inscritos:</label>
                    <div className="col-sm-1">
                        <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={props.hsp.cupo} />
                    </div>
                </div>
                <div className="row border pt-1 pb-1">
                    <div className="col align-self-center">
                        <div className="btn-group" role="group" aria-label="buttonGroup">

                            <Editarhospital id={props.hsp._id}/>
                            <MostrarHospital id={props.hsp._id}/>
                            <button className="btn btn-danger" onClick={askEliminarHospital}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}