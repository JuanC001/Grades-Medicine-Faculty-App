import React from 'react';
import { Accordion } from 'react-bootstrap'


class AgregarRotacionesADD extends React.Component {

    enviarRotacion = () => {

        const user = {

            id: this.props.rotacion.id,
            nombre_hospital: this.state.nombre_hospital,
            fechaInicial: this.state.fechaInicial,
            fechaFinal: this.state.fechaFinal,
            area: this.state.area,
            id_hospital: this.state.id_hospital,
            nota: 'no definido'

        }

        this.props.actualizarRotacion(user);

    }

    seleccionarHospital = (e) => {

        const hospitales = this.props.hospitales;
        this.setState({ nombre_hospital: e.target.value })
        for (let i = 0; i < hospitales.length; i++) {

            if (hospitales[i].nombre_hospital === e.target.value) {

                this.setState({ id_hospital: hospitales[i]._id })

            }

        }


    }

    seleccionarFechaAuto = (e) => {

        const fi = e.target.value;
        const meses = this.state.meses;
        this.setState({ fechaInicial: e.target.value });

        for (let i = 0; i <meses.length; i++) {

            if(meses[i] === fi && fi !== 'Diciembre'){
                this.setState({ fechaFinal: meses[i+1]});
            }else if(fi === 'Diciembre'){

                this.setState({fechaFinal: 'Enero'});

            }

        }

    }

    state = {
        nombre_hospital: '',
        fechaInicial: '',
        fechaFinal: '',
        area: '',
        id_hospital: '',
        meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }

    render() {
        const { rotacion, hospitales, eliminarRotacion } = this.props
        const meses = this.state.meses;
        return (

            <div>
                <Accordion.Item eventKey={rotacion.id}>

                    <Accordion.Header>

                        Rotación #{rotacion.id}

                    </Accordion.Header>
                    <Accordion.Body>

                        <div className="container">
                            <h6 className="pb-2">Sitio de Práctica</h6>

                            <div className="row pb-2">

                                <div className="col-4 input-group">

                                    <label className="input-group-text" htmlFor="hspselect">Hospital</label>
                                    <select className="form-select" id='hspselect' onChange={this.seleccionarHospital} onClick={this.enviarRotacion}>

                                        <option defaultValue >Hospital Inicial...</option>
                                        {

                                            hospitales.map(e =>
                                                <option key={e._id} value={e.nombre_hospital
                                                }>{e.nombre_hospital
                                                    }</option>)

                                        }

                                    </select>


                                </div>

                            </div>
                            <div className="row pb-2">
                                <div className="col">

                                    <div className='input-group'>
                                        <label className="input-group-text" htmlFor="fechaInicial">Fecha Inicial</label>
                                        <select id="fechaInicial" className="form-select" onChange={(e) => this.seleccionarFechaAuto(e)} onClick={this.enviarRotacion}>

                                            <option value="vacio">Seleccione uno...</option>
                                            {

                                                meses.map(e =>

                                                    <option value={e}>{e}</option>

                                                )

                                            }

                                        </select>

                                    </div>
                                </div>

                                <div className="col">

                                    <div className="input-group">
                                        <label className="input-group-text" htmlFor="fechaFinal">Fecha Final</label>
                                        <select defaultValue={this.state.fechaFinal} value={this.state.fechaFinal} id="fechaFinal" className="form-select" onChange={(e) => this.setState({ fechaFinal: e.target.value })} onClick={this.enviarRotacion}>

                                            <option value="" defaultValue>Seleccione Uno...</option>
                                            {

                                                meses.map(e =>

                                                    <option value={e}>{e}</option>

                                                )

                                            }

                                        </select>
                                    </div>
                                </div>


                            </div>

                            <div className="row">
                                <div className="col pb-2">
                                    <div className="input-group">
                                        <label className="input-group-text" htmlFor="areselect">Área</label>
                                        <select id="areselect" className="form-select" onChange={(e) => this.setState({ area: e.target.value })} onClick={this.enviarRotacion}>

                                            <option value="vacio" defaultValue>Seleccione Uno...</option>
                                            <option value="Cirugía General /qx gral" defaultValue>Cirugía General /qx gral</option>
                                            <option value="Pediatría/ped" defaultValue>Pediatría/ped</option>
                                            <option value="Medicina Interna" defaultValue>Medicina Interna</option>
                                            <option value="Ginecología y obstetricia G/O" defaultValue>Ginecología y obstetricia G/O</option>
                                            <option value="Urgencias" defaultValue>Urgencias</option>
                                            <option value="Electivas PCI-1" defaultValue>Electivas PCI-1</option>


                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col">

                                <button type="button" className="btn btn-danger" onClick={() => eliminarRotacion(rotacion.id)}>Eliminar Rotación </button>

                            </div>

                        </div>

                    </Accordion.Body>

                </Accordion.Item>
            </div>


        )
    }
}

export default AgregarRotacionesADD;