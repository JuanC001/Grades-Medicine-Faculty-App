import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavBar from '../Partials/AdminNavigation';
import AddStudent from './Estudiantes/AddStudent';
import ListaEstudiantes from './Estudiantes/ListaEstudiantes'

import './CSS/Estudiantes.css'

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default class Estudiantes extends React.Component {
  state = {
    hsp_select: 'All',
    estudiantes: [],
    hospitales: [],
    term: ''
  }

  actualizarLista = async () => {

    const ipBuilder = ip + '/api/admin/allStudents';
    const res = await axios.get(ipBuilder);
    this.setState({ estudiantes: res.data });

  }

  async componentDidMount() {

    let ipBuilder = ip + '/api/admin/allStudents';
    let res = await axios.get(ipBuilder);
    this.setState({ estudiantes: res.data });
    ipBuilder = ip + '/api/admin/allHospital';
    res = await axios.get(ipBuilder);
    this.setState({ hospitales: res.data });

  }





  render() {


    function searchTerm(term) {

      let nterm = term;
      let isNumber = false;

      for (let i = 0; i < 10; i++) {

        if(nterm.includes(i)){
          isNumber = true;
        }

      }

      if(isNumber){
        return function (x) {
          return x.documento.includes(nterm);
        }
      }

      return function (x) {
        return x.nombres.toLowerCase().includes(nterm);
      }

    }

    return (
      <div>
        <NavBar />
        <div className="text-center m-3 lista">

          <div className="bg-light mx-auto container-fluid w-80 rounded rounded-3 " >

            <h1 className="display-1 ">Listado de Estudiantes</h1>

            <hr />
            <div className="text-right pb-4 pt-1 px-2">

              <div className="row">
                <div className="col">
                  <div className="btn-toolbar">

                    <div className="btn-group me-2 text-center">

                      <AddStudent actualizar={this.actualizarLista} />
                      <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-print" /></button>
                      <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>

                    </div>

                  </div>
                </div>
                <div className="col">

                  <select name="" id="select" className="form-select bg-primary text-white" aria-label='Default select' style={{ width: '250px' }} onChange={e => this.setState({ hsp_select: e.target.value })}>

                    <option value="All" className='text-white'>Todos los Hospitales</option>
                    {this.state.hospitales.map(

                      e => <option value={e.nombre_hospital}>{e.nombre_hospital}</option>

                    )}

                  </select>

                </div>

                <div className="col">

                  <div className="row">


                    <div className="col-sm-6">
                      <input type="text" className="form-control" onChange={e => this.setState({ term: e.target.value })} />
                    </div>

                    <div className="col-sm-1">
                      <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    </div>

                  </div>


                </div>

              </div>

            </div>
            <div className="text-center mx-auto container-fluid extrascroll">

              {

                this.state.estudiantes.filter(searchTerm(this.state.term)).map(e =>

                  <ListaEstudiantes actualizar={this.actualizarLista} key={e._id} estudiante={e} hsp_select={this.state.hsp_select} />

                )

              }
            </div>

          </div>
        </div>
      </div>
    )

  }
}