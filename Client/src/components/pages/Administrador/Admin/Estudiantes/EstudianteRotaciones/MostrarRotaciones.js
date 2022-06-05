import React, { Component } from 'react'
import { Accordion } from 'react-bootstrap'



export default class MostrarRotaciones extends Component {

    render() {
        const rotaciones = this.props.rotaciones;

        const Nota = (props) => {

            const nota = props.nota

            if (nota.toLowerCase() === 'no definido') {

                return (<div>Aun no se han enviado notas</div>)

            } else {

                return (

                    <div className="border pt-2 pb-2">

                        <ul className="list-group">

                            <li className="list-group-item">

                                <div className="row">

                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center">Historia Clinica:</label>
                                    <div className="col-sm-1 my-auto">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" id="hClin" value={nota.c1} />
                                    </div>

                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center">Responsabilidad:</label>
                                    <div className="col-sm-1 my-auto">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" id="hClin" value={nota.c2} />
                                    </div>

                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center">Practica:</label>
                                    <div className="col-sm-1 my-auto">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" id="hClin" value={nota.c3} />
                                    </div>

                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center">Conocimientos Y Actualizaciones Científicas:</label>
                                    <div className="col-sm-1 my-auto">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" id="hClin" value={nota.c4} />
                                    </div>

                                </div>

                            </li>

                            <li className="list-group-item text-center active">
                                <div className="row mx-auto">
                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center text-white">Nota Final:</label>
                                    <div className="col-sm-1 my-auto">
                                        <input type="text" readOnly className="form-control-plaintext my-auto text-white" id="hClin" value={nota.c5} />
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-center">
                                <div className="row mx-auto">
                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center">Servicios En Rotación:</label>
                                    <div className="col-sm-10 my-auto">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" id="hClin" value={nota.srvs} />
                                    </div>
                                </div>
                            </li>

                            <li className="list-group-item text-center">
                                <div className="row mx-auto">
                                    <label htmlFor="hClin" className="col-sm-2 my-auto text-center">Comentarios:</label>
                                    <div className="col-sm-10 my-auto">
                                        <textarea type="text" readOnly className="form-control-plaintext my-auto" id="hClin" value={nota.cmt} />
                                    </div>
                                </div>
                            </li>

                        </ul>




                    </div>)

            }

        }

        return (

            <Accordion>
                {

                    rotaciones.map(e => (
                        <Accordion.Item eventKey={e.id} key={e.id}>
                            <Accordion.Header>
                                Rotacion #{e.id}: {e.nombre_hospital} | {e.fechaInicial} - {e.fechaFinal}
                            </Accordion.Header>
                            <Accordion.Body>

                                <div className="row border">

                                    <label htmlFor="fecha" className="col-sm-2 my-auto text-center">Area:</label>
                                    <div className="col-sm-7">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" value={e.area} />
                                    </div>

                                </div>

                                <div className="row border">

                                    <label htmlFor="fecha" className="col-sm-2 my-auto text-center">Mes Inicial:</label>
                                    <div className="col-sm-7">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" value={e.fechaInicial} />
                                    </div>

                                </div>

                                <div className="row border">

                                    <label htmlFor="fecha" className="col-sm-2 my-auto text-center">Mes Final:</label>
                                    <div className="col-sm-7 ">
                                        <input type="text" readOnly className="form-control-plaintext my-auto" value={e.fechaFinal} />
                                    </div>

                                </div>

                                <div className="row pb-1 pt-1 text-center">
                                    <h4>Nota:</h4>
                                </div>

                                <div className="row">

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
