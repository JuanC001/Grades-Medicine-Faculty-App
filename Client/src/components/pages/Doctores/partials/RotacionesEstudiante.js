import React, { useState, useEffect } from 'react';
import { Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from 'axios';
import Swal from 'sweetalert2';

const ip = 'http://' + process.env.REACT_APP_URL_API + ':5000';

const RotacionesEstudiante = (props) => {

    const rotacionPr = props.rotacion;
    const estudiante = props.estudiante;

    const [editMode, setEditMode] = useState(false);
    const [rotacion, setRotacion] = useState({});
    const [notas, setNotas] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [file, setFile] = useState();

    const [areaRotacion, setAreaRotacion] = useState('');

    const [cal1, setCal1] = useState(0);
    const [cal2, setCal2] = useState(0);
    const [cal3, setCal3] = useState(0);
    const [cal4, setCal4] = useState(0);
    const [cal5, setCal5] = useState(0);

    const [srvs, setSRVs] = useState('');
    const [cmt, setCMT] = useState('');

    const enviarNotas = async () => {

        if (srvs !== '' && cmt !== '') {

            let fileLc = file;
            let formData = new FormData();
            formData.append('image', fileLc);
            formData.append('name', rotacion.nombre_hospital);
            const ipBuilder2 = ip + '/api/doctor/recibirFirma';
            let res2 = await axios.post(ipBuilder2, formData)

            const notaEnvio = {

                id: estudiante._id,
                id_r: rotacion.id,
                c1: cal1,
                c2: cal2,
                c3: cal3,
                c4: cal4,
                c5: cal5,
                srvs: srvs,
                cmt: cmt,
                fr_url: res2.data.url

            }
            const ipBuilder = ip + '/api/doctor/asignarNota';
            let res = await axios.post(ipBuilder, notaEnvio);

            props.actualizarEstudiantes();
            Swal.fire({
                title: '¡Completado!',
                text: 'Se ha enviado las notas',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            }).then((result) => {

                if (result.isConfirmed) {

                    props.setModal(false);


                }

            })


        }

    }

    const modificarArea = async (e) => {

        Swal.fire({
            title: '¿Seguro quieres asignar ' + areaRotacion + ' a ' + estudiante.nombres + '?',
            text: 'Esta acción solo podra ser cambiada por el administrador',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sí',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                cambiarArea();
                Swal.fire('¡Cambios Realizados!', '', 'success')
            }
        })

    }

    const cambiarArea = async () => {
        const ipBuilder = ip + '/api/doctor/asignarArea';
        const rotacionNueva = {
            area: areaRotacion,
            fechaInicial: rotacion.fechaInicial,
            fechaFinal: rotacion.fechaFinal,
            id: rotacion.id,
            id_hospital: rotacion.id_hospital,
            nombre_hospital: rotacion.nombre_hospital,
            nota: rotacion.nota
        }
        const res = await axios.post(ipBuilder, {

            id: estudiante._id,
            id_r: rotacion.id,
            area: rotacionNueva.area,

        });
        setRotacion(rotacionNueva);

        props.actualizarEstudiantes();
        props.setestudiante(res.data.estudiante)

    }

    const sumarNotas = () => {

        verificarCals();

        setCal5(parseInt(cal1) + parseInt(cal2) + parseInt(cal3) + parseInt(cal4));

    }

    const verificarCals = () => {

        let errorMsg = 'Las calificaciones no pueden superar los límites\n';
        let correcto = true;

        if (cal1 > 10) {

            setCal1(0);
            errorMsg = errorMsg + '\nRevisa la calificación de Historia Clínica\n';
            correcto = false;

        }

        if (cal2 > 10) {

            setCal2(0);
            errorMsg = errorMsg + '\nRevisa la calificación de Responsabilidad\n';
            correcto = false;

        }

        if (cal3 > 20) {

            setCal3(0);
            errorMsg = errorMsg + '\nRevisa la calificación de Práctica\n';
            correcto = false;

        }

        if (cal4 > 10) {

            setCal4(0);
            errorMsg = errorMsg + '\nRevisa la calificación de Responsabilidad\n';
            correcto = false;

        }

        if (!correcto) {
            Swal.fire({
                title: '¡Whoops!',
                text: errorMsg,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK!'
            })
        }

    }

    useEffect(() => {

        setRotacion(rotacionPr);
        setNotas(rotacionPr.nota);
        console.log('Cargando rotaciones!')
        setIsLoaded(true);
        // eslint-disable-next-line
    }, [rotacionPr])

    useEffect(() => {
        sumarNotas();
        // eslint-disable-next-line
    }, [cal1, cal2, cal3, cal4])


    if (!isLoaded) {

        return (

            <h6 className="">Cargando...</h6>

        )

    } else if (rotacion.area === 'no definido') {

        return (
            <div>
                <Accordion.Header>
                    <label className="text-danger">{rotacion.fechaInicial} - {rotacion.fechaFinal} <strong>¡NO HAY ÁREA!</strong></label>
                </Accordion.Header>
                <Accordion.Body>
                    <div className="row">
                        <div className="col">
                            <h6 className=""><strong>¡Aun no se ha seleccionado un área!</strong></h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-5">
                            <select id="areselect" className="form-select" onChange={(e) => setAreaRotacion(e.target.value)}>

                                <option value="vacio" defaultValue>Seleccione uno...</option>
                                <option value="Cirugía General /qx gral" defaultValue>Cirugía General /qx gral</option>
                                <option value="Pediatría/ped" defaultValue>Pediatría/ped</option>
                                <option value="Medicina Interna" defaultValue>Medicina Interna</option>
                                <option value="Ginecología y obstetricia G/O" defaultValue>Ginecología y obstetricia G/O</option>
                                <option value="Urgencias" defaultValue>Urgencias</option>
                                <option value="Electivas PCI-1" defaultValue>Electivas PCI-1</option>

                            </select>
                        </div>

                        <div className="col-sm-1">
                            <button className="btn btn-success" onClick={e => modificarArea(e)}>Guardar</button>
                        </div>
                    </div>
                </Accordion.Body>
            </div>
        )

    } else if (editMode) {

        return (
            <div>
                <AccordionHeader rotacion={rotacion} />
                <Accordion.Body>

                    <div className="row pb-2">
                        <label htmlFor="rotacionId" className="col-sm-3 col-form-label text-end">Área de Rotación:</label>
                        <div className="col-sm-7 text-start">

                            <input type="text" className="form-control-plaintext" readOnly id="rotacionId" value={rotacion.area} />

                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="cal1" className="col-sm-3 col-form-label text-end" >Historia Clínica:</label>
                        <div className="col-sm-7 text-start">

                            <input type="number" className="form-control" id="cal1" value={cal1} max={10} min={0} onChange={e => {

                                setCal1(e.target.value);

                            }} />

                        </div>

                        <div className="col-sm-1 my-auto">

                            10/PTS

                        </div>

                        <div className="col-sm-1 my-auto">
                            <ToolTipGen text='Presentación, calidad, y evoluciones. Justificación del Laboratorio con el diagnóstico. Epicrisis' />
                        </div>



                    </div>

                    <div className="row pb-2">
                        <label htmlFor="cal2" className="col-sm-3 col-form-label text-end" >Responsabilidad:</label>
                        <div className="col-sm-7 text-start">

                            <input type="number" className="form-control" id="cal2" value={cal2} max={10} min={0} onChange={e => {

                                setCal2(e.target.value);

                            }} />

                        </div>

                        <div className="col-sm-1 my-auto">

                            10/PTS

                        </div>

                        <div className="col-sm-1 my-auto">
                            <ToolTipGen text='Asistencia, cumplimiento, colaboración, trabajo en equipo. Trato con el paciente y familiares' />
                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="cal3" className="col-sm-3 col-form-label text-end" >Práctica:</label>
                        <div className="col-sm-7 text-start">

                            <input type="number" className="form-control" id="cal3" value={cal3} max={20} min={0} onChange={e => {

                                setCal3(e.target.value);

                            }} />

                        </div>

                        <div className="col-sm-1 my-auto">

                            20/PTS

                        </div>

                        <div className="col-sm-1 my-auto">
                            <ToolTipGen text='Urgencias, Consulta externa, Hospitalizacion, Cirugía, Sala de partos y otros' />
                        </div>

                    </div>

                    <div className="row pb-2">
                        <label htmlFor="cal4" className="col-sm-3 col-form-label text-end" >Conocimientos y actualizaciones científicas:</label>
                        <div className="col-sm-7 text-start my-auto">

                            <input type="number" className="form-control" id="cal4" max={10} min={0} value={cal4} onChange={e => {

                                setCal4(e.target.value);

                            }} />

                        </div>

                        <div className="col-sm-1 my-auto">

                            10/PTS

                        </div>

                        <div className="col-sm-1 my-auto">
                            <ToolTipGen text='Seminarios, Paneles, Exposiciones, Club de Revistas, Conferencias, Conocimientos Teóricos' />
                        </div>

                    </div>


                    <div className="row pb-2">
                        <label htmlFor="cal5" className="col-sm-3 col-form-label text-end">Nota Final:</label>
                        <div className="col-sm-7 text-start my-auto">

                            <input type="text" className="form-control text-center bg-success" readOnly id="cal5" value={cal5} />

                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="srv" className="col-sm-3 col-form-label text-end">Servicios Por Los Cuales Rotó:</label>
                        <div className="col-sm-7 text-start my-auto">

                            <input type="text" className="form-control" id="srv" onChange={e => setSRVs(e.target.value)} />

                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="srv" className="col-sm-3 col-form-label text-end">Comentarios:</label>
                        <div className="col-sm-7 text-start my-auto">

                            <textarea className="form-control" id="srv" onChange={e => setCMT(e.target.value)} />

                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="srv" className="col-sm-3 col-form-label text-end">Firma:</label>
                        <div className="col-sm-7 text-start my-auto">

                            <input type="file" accept='.png, .jpg' name='firma' className="form-control" id="srv" onChange={(e) =>

                                setFile(e.target.files[0])

                            } />

                        </div>
                    </div>

                    <div className="row text-end">

                        <div className="col">
                            <button className="btn btn-success mx-1" onClick={e => enviarNotas()} style={{ width: '108px' }}>Enviar Nota</button>
                            <button className="btn btn-danger mx-1" onClick={e => setEditMode(false)} style={{ width: '108px' }}>Cancelar</button>

                        </div>

                    </div>


                </Accordion.Body>



            </div>

        );

    } else if (rotacion.nota === 'no definido') {

        return (
            <div>
                <AccordionHeader rotacion={rotacion} />
                <Accordion.Body>

                    <div className="row pb-2">
                        <label htmlFor="rotacionId" className="col-sm-3 col-form-label text-end">Área de Rotación:</label>
                        <div className="col-sm-7 text-start">

                            <input type="text" className="form-control-plaintext" readOnly id="rotacionId" value={rotacion.area} />

                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="fechaI" className="col-sm-3 col-form-label text-end">Fecha de Inicio:</label>
                        <div className="col-sm-7 text-start">

                            <input type="text" className="form-control-plaintext" readOnly id="fechaI" value={rotacion.fechaInicial} />

                        </div>
                    </div>

                    <div className="row pb-2">
                        <label htmlFor="fechaF" className="col-sm-3 col-form-label text-end">Fecha de Final:</label>
                        <div className="col-sm-7 text-start">

                            <input type="text" className="form-control-plaintext" readOnly id="fechaF" value={rotacion.fechaFinal} />

                        </div>
                    </div>

                    <div className="row text-center">

                        <button className="btn btn-primary mx-auto" style={{ width: '150px' }} onClick={e => setEditMode(true)}>Asignar Nota</button>

                    </div>



                </Accordion.Body>
            </div>

        );

    } else {

        return (
            <div>
                <AccordionHeader rotacion={rotacion} />
                <Accordion.Body>
                    <h6 className="">El estudiante tiene asignada la nota de: {notas.c5}</h6>
                </Accordion.Body>
            </div>
        )

    }
}

const AccordionHeader = (props) => {

    const rotacion = props.rotacion;

    return (

        <Accordion.Header>
            <div className="row">
                <div className="col">
                    Fecha Rotación: {rotacion.fechaInicial} - {rotacion.fechaFinal}
                </div>

            </div>
        </Accordion.Header>

    )
}

const ToolTipGen = (prp) => {

    return (

        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">{prp.text}</Tooltip>}>
            <i><FontAwesomeIcon icon="fa-solid fa-circle-question" /></i>
        </OverlayTrigger>

    )

}

export default RotacionesEstudiante;
