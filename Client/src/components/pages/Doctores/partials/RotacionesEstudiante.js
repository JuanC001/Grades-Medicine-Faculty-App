import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap'

const RotacionesEstudiante = (props) => {

    const rotacionPr = props.rotacion;

    const [editMode, setEditMode] = useState(false);
    const [rotacion, setRotacion] = useState({});

    useEffect(() => {

        setRotacion(rotacionPr);
        console.log('Cargando rotaciones!')

    }, [])



    if (editMode) {

        return (
            <div>
                <Accordion.Header eventKey={rotacion.id}>
                    <div className="row">
                        <div className="col-sm-3">
                            <label>Area:</label>
                        </div>
                        <div className="col-sm-8">
                            <u>{rotacion.area}</u>
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <button className="btn btn-primary" onClick={e => setEditMode(false)}>Toggle</button>
                    {rotacion.area}
                </Accordion.Body>
            </div>

        );

    } else {

        return (
            <div>
                <Accordion.Header eventKey={rotacion.id}>
                    <div className="row">
                        <div className="col">
                            Area:
                        </div>
                        <div className="col">
                            <u>{rotacion.area}</u>
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <button className="btn btn-primary" onClick={e => setEditMode(true)}>Toggle</button>
                </Accordion.Body>
            </div>

        );

    }
}

export default RotacionesEstudiante;
