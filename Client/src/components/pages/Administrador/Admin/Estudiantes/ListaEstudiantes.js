import React, {useState} from 'react'
import './CSS/LE.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import MostrarEstudiante from './MostrarEstudiante';
import EditarEstudiante from './EditarEstudiante';

import Swal from 'sweetalert2';

const ip = 'http://'+ process.env.REACT_APP_URL_API+ ':5000';

export default function ListaEstudiantes(props) {

  const [estilo, setEstilo] = useState({backgroundColor: '#fffff'})
  const id_estudiante = props.estudiante._id;

  let coincideRotacion = false;
  for (let i = 0; i < props.estudiante.rotaciones.length; i++) {

    if(props.estudiante.rotaciones[i].nombre_hospital === props.hsp_select){
      coincideRotacion = true;
      setEstilo({backgroundColor: '#fffff'})
    }

  }

  const borrarEstudiante = async (e) => {

    const ipBuilder = ip + '/api/admin/eliminarEstudiante';
    await axios.post(ipBuilder, { _id: id_estudiante });
    props.actualizar()

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
        );

      }

    });

  }

  if(coincideRotacion || props.hsp_select === 'All'){

    return (
      <div className="card mb-3 shadow-sm">
  
        <div className="card-header" style={estilo}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="row">
                  <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Estudiante:</label>
                  <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{props.estudiante.nombres}</u></label>
                </div>
              </div>
              <div className="col-sm-3 align-self-end">
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
            <div className="col-sm-9">
  
              <ul className="list-group">
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
  
              </ul>
  
            </div>
  
            <div className="col-sm-1">
  
              <div className="row pb-1">
                <MostrarEstudiante id={props.estudiante._id} />
              </div>
              <div className="row pb-1">
                <div>
                  <EditarEstudiante id={props.estudiante._id} actualizar = {props.actualizar}/>
                </div>
              </div>
              <div className="row pb-1">
                <div>
                  <button className="btn btn-danger" onClick={askEliminarEstudiante}><FontAwesomeIcon icon="fa-solid fa-trash-can" /> </button>
                </div>
              </div>
            </div>
  
          </div>
  
        </div>
  
  
      </div>
  
    )

  }

}
