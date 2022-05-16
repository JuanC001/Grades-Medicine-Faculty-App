import React from 'react';
import { Accordion } from 'react-bootstrap'


class AgregarRotacionesADD extends React.Component {

    enviarRotacion = () => {

        const user = {

            id: this.props.rotacion.id,
            nombre_hospital: this.state.nombre_hospital,
            fechaInicial : this.state.fechaInicial,
            fechaFinal : this.state.fechaFinal,
            area: this.state.area,
            id_hospital : this.state.id_hospital,
            nota: 'No Definido'

        }

        this.props.actualizarRotacion(user);

    }

    seleccionarHospital = (e) => {

        const hospitales = this.props.hospitales;
        this.setState({nombre_hospital: e.target.value })
        for (let i = 0; i < hospitales.length; i++){

            if(hospitales[i].nombre_hospital === e.target.value){

                this.setState({id_hospital: hospitales[i]._id})

            }

        }


    }

    state = {
        nombre_hospital: '',
        fechaInicial: '',
        fechaFinal: '',
        area: '',
        id_hospital: '',
    }

    render() {
        const { rotacion, hospitales, eliminarRotacion } = this.props
        return (

            <div>
                <Accordion.Item eventKey={rotacion.id}>

                    <Accordion.Header>

                        Rotación #{rotacion.id}

                    </Accordion.Header>
                    <Accordion.Body>

                        <div className="container">
                            <h6 className="pb-2">Sitio de Practica</h6>

                            <div className="row pb-2">

                                <div className="col-4 input-group mb-3">

                                    <label className="input-group-text" htmlFor="hspselect">Hospital</label>
                                    <select className="form-select" id='hspselect' onChange={this.seleccionarHospital} onClick= {this.enviarRotacion}>

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

                                    <div className='input-group input-group-sm mb-3'>
                                        <label className="input-group-text" htmlFor="date1">Fecha Inicial</label>
                                        <input className='px-1' type="date" id='date1' name="date1" onChange={(e) => this.setState({ fechaInicial: e.target.value })} onClick= {this.enviarRotacion}></input>

                                    </div>
                                </div>

                                <div className="col">

                                    <div className='input-group input-group-sm mb-3'>
                                        <label className="input-group-text" htmlFor="date2">Fecha Final</label>
                                        <input className='px-1' type="date" id='date2' name="date2" onChange={(e) => this.setState({ fechaFinal: e.target.value })} onClick= {this.enviarRotacion}></input>

                                    </div>
                                </div>


                            </div>

                            <div className="row">
                                <div className="col pb-2">
                                    <div className="input-group">
                                        <label className="input-group-text" htmlFor="areselect">Area</label>
                                        <select id="areselect" className="form-select" onChange={(e) => this.setState({ area: e.target.value })} onClick= {this.enviarRotacion}>

                                            <option value="vacio" defaultValue>Seleccione Uno</option>
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