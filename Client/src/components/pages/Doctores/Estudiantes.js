import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

import DoctorNavigation from './partials/DoctorNavigation'
import ListaEstudiantes from './ListaEstudiantes'
import './CSS/Estudiantes.css'

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default function Estudiantes(props) {

  const user = props.user;
  console.log('USER:' + user.nombre)
  const [estudiantes, setEstudiantes] = useState([]);
  const [hospitalf, setHospitalf] = useState({});

  const obtenerEstudiantes = async (hosp) => {

    const ipBuilder = ip + '/api/doctor/estudiantes';
    setHospitalf(hosp);
    let res = await axios.post(ipBuilder, { estudiantesafiliados: hosp.estudiantesAfiliados })

    setEstudiantes(res.data);

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

          <h1 className="display-5">Estudiantes en: {user.hospital}</h1>

          <hr />
          <div className="text-center">

            {

              estudiantes.map(e =>

                <ListaEstudiantes key={e._id} estudiante={e} hsp_id={hospitalf._id} rotaciones={

                  obtenerRotaciones(e)

                } />

              )

            }

          </div>

        </div>
      </div>

    </div>
  )
}
