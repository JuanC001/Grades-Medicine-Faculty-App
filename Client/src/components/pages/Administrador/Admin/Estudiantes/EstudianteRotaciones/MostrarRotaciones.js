import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap'



export default class MostrarRotaciones extends Component {

    render() {
        const rotaciones = this.props.rotaciones;

        const Nota = (props) => {

            const nota = props.nota

            if (nota === 'No Definido') {

                return (<div>Aun no se han enviado notas</div>)

            } else {

                return (<div>


                    <div className="row pb-1">

                        <div className="col">

                            Historia Clinica: {nota.c1}

                        </div>

                        <div className="col">

                            Responsabilidad: {nota.c2}

                        </div>

                        <div className="col">

                            Practica: {nota.c3}

                        </div>

                        <div className="col">

                            Historia Clinica: {nota.c4}

                        </div>

                    </div>

                    <div className="row pb-1">

                        <div className="col">

                            Nota Final: {nota.c5}

                        </div>

                    </div>

                    <div className="row pb-1">

                        <div className="col">
                            Servicios Por los Cuales Rotó: {nota.srvs}
                        </div>

                    </div>

                    <div className="row pb-1">

                        <div className="col">
                            Comentarios: {nota.cmt}
                        </div>

                    </div>

                </div>)

            }

        }

        return (

            <Accordion>
                {

                    rotaciones.map(e => (
                        <Accordion.Item eventKey={e.id} key={e.id}>
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
                                    <Nota nota={e.nota} />
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                    ))

                }
            </Accordion>
        )
    }
}
