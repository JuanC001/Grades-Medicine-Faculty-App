import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ListaHospitales(props){

    return (

        

        <div className="card mb-3 card-list text-center container-fluid">

            <h1>{props.hsp.nombre_hospital}</h1>
            {console.log('a')}

        </div>

    )
    
}