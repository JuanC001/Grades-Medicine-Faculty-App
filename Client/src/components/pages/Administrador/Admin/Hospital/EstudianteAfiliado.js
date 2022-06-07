import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap'

import axios from 'axios';


const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default class MostrarEstudiantes extends Component {


  async componentDidMount() {

    const ipBuilder = ip + '/api/admin/unEstudiante'
    const estudiante = await axios.post(ipBuilder, { _id: this.props.est })
    this.setState({ estudiante: estudiante.data })

    const rotacionesEstudiante = estudiante.data.rotaciones;

    let rotacionesEst = []

    for (let i = 0; i < rotacionesEstudiante.length; i++) {

      if (rotacionesEstudiante[i].id_hospital === this.props.hsp_id) {

        rotacionesEst.push(rotacionesEstudiante[i]);

        this.setState({ rotaciones: rotacionesEst })

      }

    }

    this.setState({loaded: true})

  }

  state = {

    estudiante: {},
    rotaciones: [],
    loaded: false

  }

  render() {

    const { est } = this.props;
    const estudiante = this.state.estudiante;
    const rotaciones = this.state.rotaciones;
    if (this.state.loaded) {
      return (
        <Accordion.Item eventKey={est}>

          <Accordion.Header>

            {estudiante.nombres}

          </Accordion.Header>

          <Accordion.Body>
            <div className="row">

              <div className="col">

                <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Nombres:</label>
                <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{estudiante.nombres}</u></label>

              </div>

              <div className="col">

                <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">CC:</label>
                <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{estudiante.documento}</u></label>

              </div>

            </div>

            {

              rotaciones.map(e =>

                <div key={e.id}>
                  <hr />
                  <div className="row">

                    <div className="col">

                      <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Area:</label>
                      <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{e.area}</u></label>

                    </div>

                    <div className="col">

                      <label htmlFor="nombreL" className="col-sm-4 col-form-label text-start">Fecha Inicio:</label>
                      <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{e.fechaInicial}</u></label>

                    </div>

                    <div className="col">

                      <label htmlFor="nombreL" className="col-sm-3 col-form-label text-start">Fecha Final:</label>
                      <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{e.fechaFinal}</u></label>

                    </div>

                  </div>
                </div>

              )

            }

          </Accordion.Body>

        </Accordion.Item>)

    }else{

      return (

        <h6 className="display-6">Loading...</h6>

      )

    }
    
    
  }
}
