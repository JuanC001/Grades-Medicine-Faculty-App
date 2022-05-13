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
  const [hospitalf, setHospitalf] = useState(null);

  const obtenerEstudiantes = async (hosp) => {

    console.log('Obteniendo Estudiantes')
    const ipBuilder = ip + '/api/doctor/estudiantes';

    let res = await axios.post(ipBuilder, { estudiantesafiliados: hosp[0].estudiantesAfiliados })

    setEstudiantes(res.data);

  }

  const obtenerHospital = async () => {

    const ipBuilder2 = ip + '/api/doctor/' + user.hospital;

    let res = await axios.get(ipBuilder2);
    setHospitalf(res.data);

    obtenerEstudiantes(res.data);

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

                <ListaEstudiantes key={e._id} estudiante={e} />

              )

            }



          </div>

        </div>
      </div>

    </div>
  )
}
