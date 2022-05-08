import { useParams } from 'react-router-dom'
import React from 'react'
import ListaEstudiantes from './ListaEstudiantes'
import './CSS/Estudiantes.css'

export default function Estudiantes() {

  const { hospital } = useParams()

  return (
    <div>

      <div className="container-fluid bg-light w-80 p-5 mt-5 rounded rounded-3 shadow text-center">

        <h1 className="display-5">Estudiantes en: {hospital}</h1>

        <hr />
        <div className="text-center">

          <ListaEstudiantes />

        </div>

      </div>

    </div>
  )
}
