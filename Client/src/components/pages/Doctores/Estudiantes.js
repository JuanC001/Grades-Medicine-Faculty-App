import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DoctorNavigation from './partials/DoctorNavigation'
import ListaEstudiantes from './ListaEstudiantes'
import './CSS/Estudiantes.css'

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default function Estudiantes(props) {

  const user = props.user;
  console.log('USER:' + user.nombre)
  const [estudiantes, setEstudiantes] = useState([]);
  const [hospitalf, setHospitalf] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [filtro, setFiltro] = useState('');

  const obtenerEstudiantes = async (hosp) => {

    const ipBuilder = ip + '/api/doctor/estudiantes';
    setHospitalf(hosp);
    let res = await axios.post(ipBuilder, { estudiantesafiliados: hosp.estudiantesAfiliados })

    setEstudiantes(res.data);
    setIsLoaded(true);

  }

  const actualizarEstudiantes = async () => {
    setIsLoaded(false);
    const ipBuilder = ip + '/api/doctor/estudiantes';
    let res = await axios.post(ipBuilder, { estudiantesafiliados: hospitalf.estudiantesAfiliados })
    setEstudiantes(res.data);
    setIsLoaded(true);

  }

  const obtenerHospital = async () => {

    const ipBuilder2 = ip + '/api/doctor/' + user.hospital;

    let res = await axios.get(ipBuilder2);
    console.log(res.data)
    obtenerEstudiantes(res.data);

  }

  const obtenerRotaciones = (e) => {

    const rotacionesEspecificas = []

    for (let i = 0; i < e.rotaciones.length; i++) {

      if (e.rotaciones[i].id_hospital === hospitalf._id) {

        rotacionesEspecificas.push(e.rotaciones[i]);

      }

    }

    return rotacionesEspecificas;

  }

  useEffect(() => {

    obtenerHospital();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <DoctorNavigation setstatemt={props.setstatemt} />
      <div className="lista">
        <div className="container-fluid bg-light w-80 p-5 mt-4 rounded rounded-3 shadow text-center">

          <h1 className="display-5">Estudiantes en: <u>{user.hospital}</u></h1>

          <hr />

          <div className="row m-3">
            <div className="col-sm-6">
              <input type="text" name="asd" id="asd" className="form-control" placeholder='Busque por nombre o numero de documento' onChange={e => setFiltro(e.target.value)} />
            </div>
            <div className="col-sm-1">
              <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
            </div>

            <div className="col-sm-1">
              <button className="btn btn-primary" onClick={e => actualizarEstudiantes()}><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /></button>
            </div>

          </div>

          <div className="text-center extrascroll" style={{ height: '800px' }}>

            <Loader estudiantes={estudiantes} hospitalf={hospitalf} obtenerRotaciones={obtenerRotaciones} actualizarEstudiantes={actualizarEstudiantes} isLoaded={isLoaded} filtro={filtro} />

          </div>

        </div>
      </div>

    </div>
  )

}

function Loader(props) {

  const estudiantes = props.estudiantes;
  const obtenerRotaciones = props.obtenerRotaciones;
  const hospitalf = props.hospitalf;
  const actualizarEstudiantes = props.actualizarEstudiantes;
  const isLoaded = props.isLoaded;
  const filtro = props.filtro;



  if (isLoaded) {
    return (
      estudiantes.filter(searchTerm(filtro)).map(e =>

        <ListaEstudiantes key={e._id} estudiante={e} hsp_id={hospitalf._id} rotaciones={

          obtenerRotaciones(e)} actualizarEstudiantes={actualizarEstudiantes} />

      )
    )
  } else {

    return (


      <Spinner animation="border" variant="primary" className="loadingSpinner" />

    )

  }

  function searchTerm(term) {

    let nterm = term.toLowerCase();
    let isNumber = false;

    for (let i = 0; i < 10; i++) {

      if (nterm.includes(i)) {
        isNumber = true;
      }

    }

    if (isNumber) {
      return function (x) {
        return x.documento.includes(nterm);
      }
    }

    return function (x) {
      return x.nombres.toLowerCase().includes(nterm);
    }

  }





}
