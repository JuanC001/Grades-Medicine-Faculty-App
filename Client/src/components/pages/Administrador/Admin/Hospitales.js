import React from 'react'
import AdminNavigation from '../../../partials/AdminNavigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import AddStudent from '../../../partials/AddStudent';
import ListaHospitales from '../Hospital/ListaHospitales';

export default class Hospitales extends React.Component {

  state = {
    hospitales: []
  }

  async componentDidMount() {

    const res = await axios.get('http://localhost:5000/api/admin/allHospital');
    this.setState({ hospitales: res.data });
    console.log(this.state.hospitales);

  }

  render() {

    return (
      <div>

        <AdminNavigation />
        <div className="text-center m-3">

          <div className="bg-light mx-auto container-fluid w-75 rounded rounded-3">

            <h1 className="display-1 ">Listado de Hospitales</h1>

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
                
                this.state.hospitales.map(

                  e => 

                    <ListaHospitales hsp = {e}/>

                )

              }

            </div>

          </div>

        </div>

      </div>
    )

  }
}
