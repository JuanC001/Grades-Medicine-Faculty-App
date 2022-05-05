import React from 'react'
import './LE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import MostrarEstudiante from './MostrarEstudiante';

import Swal from 'sweetalert2';

const ip = 'http://localhost:5000';

export default function ListaEstudiantes(props) {


  const id_estudiante = props.estudiante._id;

  const borrarEstudiante = async (e) => {

    const ipBuilder = ip + '/api/eliminarEstudiante';

    await axios.post(ipBuilder, { _id: id_estudiante });

  }

  const askEliminarEstudiante = (e) => {

    e.preventDefault();
    Swal.fire({
      title: `¿Seguro que quieres eliminar a ${props.estudiante.nombres}?`,
      text: "¡Esto no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        borrarEstudiante();
        Swal.fire(
          '¡Eliminado!',
          'Se borro al estudiante',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {

            window.location.reload(false);
          }
        });


      }

    });

    // return navigate('/admin/Estudiantes');

  }

  return (
    <div className="card mb-3">

      <div className="card-header">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row">
                <label htmlFor="nombreL" className="col-sm-4 col-form-label">Estudiante:</label>
                <label htmlFor="" className="col-sm-5 col-form-label">{props.estudiante.nombres}</label>
              </div>
            </div>

            <div className="col align-self-end">
              <div className="roq">
                <label htmlFor="nombreL" className="col-sm-2 col-form-label text-end align-self-end">CC:</label>
                <label htmlFor="" className="col col-form-label">{props.estudiante.documento}</label>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-sm-2">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="cardimg" />
          </div>
          <div className="col-sm-10 cardimg">

          </div>
        </div>

      </div>


    </div>

  )
}
