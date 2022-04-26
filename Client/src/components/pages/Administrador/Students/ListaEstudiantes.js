import React from 'react'
import './LE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import MostrarEstudiante from './MostrarEstudiante';

import Swal from 'sweetalert2';


export default function ListaEstudiantes(props) {


  const id_estudiante = props.estudiante._id;

  const borrarEstudiante = async (e) => {

    await axios.post('http://localhost:5000/api/admin/eliminarEstudiante', { _id: id_estudiante });

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
        <div className="row">
          <label htmlFor="nombreL" className="col-sm-3 col-form-label">Estudiante:</label>
          <div className="col-sm-5">
            <input readOnly type="text" className=" form-control-plaintext" id="nombreL" value={props.estudiante.nombres} />
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-sm-2">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="img-fluid rounded-start border" />
          </div>
        </div>

      </div>


    </div>

  )
}
