import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';

import AdminNavigation from '../Partials/AdminNavigation'
import AddHospital from './Hospital/AddHospital';
import ListaHospitales from './Hospital/ListaHospitales';
import './CSS/Estudiantes.css'

const ip = 'http://' + process.env.REACT_APP_URL_API + ':' + process.env.REACT_APP_PORT_API;

export default class Hospitales extends React.Component {

  state = {
    hospitales: [],
    hsp_busqueda: '',
  }

  actualizarLista = async () => {
    const ipBuilder = ip + '/api/admin/allHospital';
    const res = await axios.get(ipBuilder);
    this.setState({ hospitales: res.data });
  }

  async componentDidMount() {

    const ipBuilder = ip + '/api/admin/allHospital';
    const res = await axios.get(ipBuilder);
    this.setState({ hospitales: res.data });

  }

  render() {

    function filtrarHospitales(busqueda) {

      return function (x) {
        return x.nombre_hospital.toLowerCase().includes(busqueda);
      }

    }

    return (

      <div>

        <AdminNavigation />
        <div className="text-center m-3 lista">

          <div className="bg-light mx-auto container-fluid  w-80 h-100 rounded rounded-3">

            <h5 className="display-5 ">Listado de Hospitales</h5>

            <hr />

            <div className="text-right pb-2 px-2">
              <div className="row">
                <div className="col">
                  <div className="btn-toolbar">

                    <div className="btn-group me-2 text-center">

                      <AddHospital className="btn btn-primary" actualizar={this.actualizarLista} />
                      <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-print" /></button>
                      <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>

                    </div>

                  </div>
                </div>

                <div className="col">

                  <div className="row">
                    <div className="col-sm-6">
                      <input type="text" className="form-control" onChange={e => this.setState({ hsp_busqueda: e.target.value })} placeholder='Busca por nombre del hospital' />

                    </div>
                    <div className="col-sm-1" style={{ width: '40px' }}>
                      <button className="btn btn-primary" style={{ width: '40px' }}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="text-center mx-auto container-fluid extrascroll" style={{ overflow: "scroll" }}>

              {

                this.state.hospitales.filter(filtrarHospitales(this.state.hsp_busqueda)).map(

                  e =>

                    <ListaHospitales key={e._id} hsp={e} actualizar={this.actualizarLista} />

                )

              }

            </div>

          </div>

        </div>

      </div>
    )

  }
}
