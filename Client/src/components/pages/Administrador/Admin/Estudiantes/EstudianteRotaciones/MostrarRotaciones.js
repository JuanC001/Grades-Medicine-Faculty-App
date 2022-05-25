import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap'

export default class MostrarRotaciones extends Component {
    render() {
        const rotaciones = this.props.rotaciones;
        return (

            <Accordion>
                {

                    rotaciones.map(e => (
                        <Accordion.Item eventKey={e.id} key= {e.id}>
                            <Accordion.Header>
                                Rotacion #{e.id}: {e.nombre_hospital}
                            </Accordion.Header>
                            <Accordion.Body>

                                <div className="row">

                                    <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Hospital:</label>
                                    <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{e.nombre_hospital}</u></label>

                                </div>

                                <div className="row">

                                    <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Area:</label>
                                    <label htmlFor="" className="col-sm-5 col-form-label text-start"><u>{e.area}</u></label>

                                </div>

                                <div className="row">

                                    <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Fecha de Inicio:</label>
                                    <label htmlFor="" className="col-sm-2 col-form-label text-start"><u>{e.fechaInicial}</u></label>
                                    <label htmlFor="nombreL" className="col-sm-2 col-form-label text-start">Fecha de Final:</label>
                                    <label htmlFor="" className="col-sm-2 col-form-label text-start"><u>{e.fechaFinal}</u></label>

                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                    ))

                }
            </Accordion>
        )
    }
}
