import React, { Component, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'
import jsPDF from 'jspdf'

import axios from 'axios';
const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

export default class MostrarRotaciones extends Component {
    

    state = {

        imagen: null

    }

    pdfGenerate = (rotacionPropia) => {

        const estudiante = this.props.estudiante;
        const rt = rotacionPropia.e;
        var nombre_hospital = '' + rt.nombre_hospital
        console.log(rt.nombre_hospital)

        var doc = new jsPDF('landscape', 'px', 'a4', 'false');

        doc.setFont('Helvetica', 'bold')
        doc.text(236, 60, "Universidad el Bosque")
        doc.text(213, 80, 'Escuela Colombiana de medicina')
        doc.text(210, 100, 'Guia de Evaluación de internos')
        doc.text(210, 120, 'PRACTICA CLÍNICA INTEGRADA')
        doc.setFont("Arial", "normal")
        doc.text(60, 150, "NOMBRES Y APELLIDOS:")
        doc.text(205, 150, estudiante.nombres)
        doc.text(60, 170, "ROTACIÓN:")
        doc.text(130, 170, "De " + rt.fechaInicial + " a " + rt.fechaFinal)
        doc.text(60, 190, "HOSPITAL:")
        doc.text(130, 190, rt.nombre_hospital)
        doc.text(60, 210, "SEMESTRE:")
        doc.text(130, 210, '' + estudiante.semestre)
        doc.text(60, 250, "HISTORIA CLÍNICA:")
        doc.text(180, 250, rt.nota.c1);
        doc.text(60, 270, "RESPONSABILIDAD:")
        doc.text(180, 270, rt.nota.c2)
        doc.text(60, 290, "PRÁCTICA:")
        doc.text(130, 290, rt.nota.c3)
        doc.text(60, 310, "CONOCIMIENTOS Y ACTUALIZACIONES CIENTIFICAS:")
        doc.text(370, 310, rt.nota.c4)
        doc.text(60, 330, "CALIFICACIÓN")
        doc.text(150, 330, "" + rt.nota.c5)
        doc.text(60, 350, "OBSERVACIONES")
        doc.text(60, 370, rt.nota.cmt)
        doc.text(60, 390, "FIRMA")

        doc.save('documento.pdf')

    }

    firmaGeneral = async (nota) => {

        const ipBuilder = ip + '/api/admin/notFirma';

        console.log('asodfnaiofnawio fa' + nota)

        if(this.state.imagen === null){

            const res = await axios.post(ipBuilder, {

                img_url: nota,
                responseType: 'blob'
    
            });

            console.log(res)
            
            this.setState({imagen: res.data})
            return res.data;

        }
        


    }

    render() {

        const rotaciones = this.props.rotaciones;

        const Firma = (prp) => {

            const r = prp.nota;
            this.firmaGeneral(r.url);
            return (

                <img src={this.state.imagen}/>

            )

        }

        const Nota = (props) => {

            const nota = props.nota

            if (nota === 'no definido') {

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

                                    <div className="col-sm-1" style={{ textAlign: 'center' }}>

                                        <button onClick={a => this.pdfGenerate({ e })} className="btn btn-primary">PDF</button>

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
