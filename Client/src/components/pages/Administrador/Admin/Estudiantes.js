import React from 'react';
import ListaEstudiantes from '../Students/ListaEstudiantes'
import NavBar from '../Partials/AdminNavigation'
import AddStudent from '../Partials/AddStudent';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CSS/Estudiantes.css'

export default class Estudiantes extends React.Component {
  state = {
    estudiantes: []
  }

  async componentDidMount() {
    
    const res = await axios.get('http://localhost:5000/api/admin/allStudents');
    this.setState({ estudiantes: res.data });

  }

  render() {

    return (
      <div>
        <NavBar />
        <div className="text-center m-3">

          <div className="bg-light mx-auto container-fluid w-80 rounded rounded-3">

            <h1 className="display-1 ">Listado de Estudiantes</h1>

            <hr />
            <div className="text-right pb-2 px-2">
              <div className="btn-toolbar">

                <div className="btn-group me-2 text-center">

                  <AddStudent />
                  <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-print" /></button>
                  <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>

                </div>

              </div>
            </div>
            <div className="text-center mx-auto container-fluid">
              {

                this.state.estudiantes.map(e =>

                  <ListaEstudiantes key={e._id} estudiante={e} />

                )

              }
            </div>

          </div>
        </div>
      </div>
    )

  }
}