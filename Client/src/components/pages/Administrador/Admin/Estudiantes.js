import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NavBar from '../Partials/AdminNavigation';
import AddStudent from './Estudiantes/AddStudent';
import ListaEstudiantes from './Estudiantes/ListaEstudiantes'
import Excel from "react-export-excel";

import { Spinner } from 'react-bootstrap';

import './CSS/Estudiantes.css'

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

function ExcelDescarga(props) {

  const ExcelFile = Excel.ExcelFile;
  const ExcelHoja = Excel.ExcelFile;
  const ExcelColumna = Excel.ExcelColumn;
  var lista = props.estudiantes;
  var i = 0;
  var contador = 0
  function Areas(nombre) {
    if (contador === 6) {
      i++;
      contador = 0;
    }
    if (i === lista.length) {
      i = 0;
    }
    for (let j = 0; j < lista[i].rotaciones.length; j++) {
      if (lista[i].rotaciones[j].area === nombre) {
        let medicina = lista[i].rotaciones[j].nota.c5;
        contador++
        return medicina
      } else {
        if (lista[i].rotaciones.length === j + 1) {
          contador++
          return 0;
        }
      }
    }
  }

  return (
    <ExcelFile element={<button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-print" /></button>} filename="Lista estudiantes">
      <ExcelHoja data={lista} name="Lista de estudiantes">
        <ExcelColumna label="Documento" value="documento" />
        <ExcelColumna label="Nombres y apellidos" value="nombres" />
        <ExcelColumna label="Medicina Interna" value={(e) => {
          return Areas("Medicina Interna");
        }} />
        <ExcelColumna label="Cirugía General /qx gral" value={(e) => {
          return Areas("Cirugía General /qx gral");
        }} />
        <ExcelColumna label="Pediatría/ped" value={(e) => {
          return Areas("Pediatría/ped");
        }} />
        <ExcelColumna label="Ginecología y obstetricia G/O" value={(e) => {
          return Areas("Ginecología y obstetricia G/O");
        }} />
        <ExcelColumna label="Urgencias" value={(e) => {
          return Areas("Urgencias");
        }} />
        <ExcelColumna label="Electivas PCI-1" value={(e) => {
          return Areas("Electivas PCI-1");
        }} />

      </ExcelHoja>
    </ExcelFile>
  )
}

export default class Estudiantes extends React.Component {
  state = {
    hsp_select: 'All',
    estudiantes: [],
    hospitales: [],
    term: '',
    loading: true,
    active_filter: "form-select bg-primary text-white w-75 mx-auto"
  }

  actualizarLista = async () => {
    this.setState({ loading: true });
    const ipBuilder = ip + '/api/admin/allStudents';
    const res = await axios.get(ipBuilder);
    this.setState({ estudiantes: res.data });
    this.setState({ loading: false });

  }

  async componentDidMount() {

    let ipBuilder = ip + '/api/admin/allStudents';
    let res = await axios.get(ipBuilder);
    this.setState({ estudiantes: res.data });
    ipBuilder = ip + '/api/admin/allHospital';
    res = await axios.get(ipBuilder);
    this.setState({ hospitales: res.data });

    this.setState({ loading: false });

  }

  organizarFiltro = (e) => {

    this.setState({ hsp_select: e.target.value });

    if (e.target.value !== 'All') {

      this.setState({ active_filter: "form-select bg-success text-white w-75 mx-auto" });

    } else {
      this.setState({ active_filter: "form-select bg-primary text-white w-75 mx-auto" });
    }

  }

  render() {

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

    const Loading = () => {

      if (this.state.loading) {

        return <div className="loadingDiv0">
          <div className="loadingDiv1">
            <Spinner animation="border" variant="primary" className="loadingSpinner" />
          </div>
        </div>

      }

      return <div>
        {

          this.state.estudiantes.filter(searchTerm(this.state.term)).map(e =>

            <ListaEstudiantes actualizar={this.actualizarLista} key={e._id} estudiante={e} hsp_select={this.state.hsp_select} />

          )

        }
      </div>

    }

    return (
      <div>
        <NavBar />
        <div className="text-center m-3 lista">

          <div className="bg-light mx-auto container-fluid rounded rounded-3 " style={{ width: '98%' }}>

            <h5 className="display-5 ">Listado de Estudiantes</h5>

            <hr />
            <div className="text-right mx-auto container-fluid p-1 shadow-sm border-bottom rounded-3">

              <div className="row">
                <div className="col">
                  <div className="btn-toolbar">

                    <div className="btn-group mx-auto">

                      <AddStudent actualizar={this.actualizarLista} />
                      <ExcelDescarga estudiantes={this.state.estudiantes} />
                      <button className="btn btn-primary" onClick={e => this.actualizarLista()}><FontAwesomeIcon icon="fa-solid fa-arrows-rotate" /></button>

                    </div>

                  </div>
                </div>
                <div className="col">

                  <select name="" id="select_filter_hsp" className={this.state.active_filter} aria-label='Default select' onChange={e => this.organizarFiltro(e)}>

                    <option value="All" className='text-white'>Todos los Hospitales</option>
                    {this.state.hospitales.map(

                      e => <option value={e.nombre_hospital}>{e.nombre_hospital}</option>

                    )}

                  </select>

                </div>

                <div className="col">

                  <div className="row mx-auto">


                    <div className="col-sm-8">
                      <input type="text" className="form-control" onChange={e => this.setState({ term: e.target.value })} placeholder='Busque por documento o nombre' />
                    </div>

                    <div className="col-sm-1">
                      <button className="btn btn-primary"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    </div>

                  </div>


                </div>

              </div>

            </div>
            <div className="text-center mx-auto my-auto mt-2 container-fluid extrascroll">

              <Loading />

            </div>

          </div>
        </div>
      </div>
    )

  }
}