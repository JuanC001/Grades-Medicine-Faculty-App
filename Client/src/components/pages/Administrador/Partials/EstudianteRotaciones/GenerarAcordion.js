import React from 'react';
import { Accordion } from 'react-bootstrap'
import axios from 'axios';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';


class GenerarAcordion extends React.Component {

    state = {
        hospitales: this.props.hospitales,
        nombre_hospital: '',
        fechaInicial: '',
        fechaFinal: ''
    }


    nombreHospital = (e) => { 

        e.preventDefault();
        const nombre = e.target.value
        this.setState({nombre_hospital: nombre});
        
        const rotacion = {

            hospital: nombre,
            fechaInicial: this.state.fechaInicial,
            fechaFinal: this.state.fechaFinal
           

        }
        this.props.actualizarRotacion(rotacion);
    }

    fechaInicial = (e) => { 

        e.preventDefault();
        const fecha1 = e.target.value
        this.setState({fechaInicial: fecha1});
        
        const rotacion = {

            hospital: this.state.nombre_hospital,
            fechaInicial: fecha1,
            fechaFinal: this.state.fechaFinal
           

        }
        this.props.actualizarRotacion(rotacion);
    }

    render() {
        const {eliminarRotaciones} = this.props
        return (
            <Accordion>

                {this.props.rotaciones.map(rotacion => (

                    <Accordion.Item eventKey={rotacion.id} key={rotacion.id} >

                        <Accordion.Header bg="primary">

                            {rotacion.text}

                        </Accordion.Header>

                        <Accordion.Body>
                            <div className="container">
                                <h6 className="pb-2">Sitio de Practica</h6>

                                <div className="row pb-2">

                                    <div className="col-4 input-group mb-3">

                                        <label className="input-group-text" htmlFor="hspselect">Hospital</label>
                                        <select className="form-select" id='hspselect' onChange={this.nombreHospital}>

                                            <option defaultValue >Hospital Inicial...</option>
                                                {

                                                    this.state.hospitales.map(e =>
                                                        <option key={e._id} value={e.nombre_hospital
                                                        }>{e.nombre_hospital
                                                            }</option>)

                                                }



                                        </select>


                                    </div>

                                </div>
                                <div className="row pb-2">
                                    <div className="col">

                                        <div className='input-group input-group-sm mb-3'>
                                            <label className="input-group-text" htmlFor="date1">Fecha Inicial</label>
                                            <input className='px-1' type="date" id='date1' name="date1" onChange={this.fechaInicial}></input>

                                        </div>
                                    </div>

                                    <div className="col">

                                        <div className='input-group input-group-sm mb-3'>
                                            <label className="input-group-text" htmlFor="date2">Fecha Final</label>
                                            <input className='px-1' type="date" id='date2' name="date2" onChange={(e) => this.setState({ fechaFinal: e.target.value })}></input>

                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="row">
                                <div className="col">

                                        <button type="button" className="btn btn-danger" onClick={() => eliminarRotaciones(rotacion.id)}>Eliminar Rotación </button>

                                </div>

                            </div>

                        </Accordion.Body>

                    </Accordion.Item>

                ))}
            </Accordion>
        )
    }
}

export default GenerarAcordion;