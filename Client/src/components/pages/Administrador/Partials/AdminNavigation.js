import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
//import './css/AdminNavigation.css'
import { useNavigate } from 'react-router-dom';


const AdminNavigation = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <img src="https://imgs.search.brave.com/bNg6um44OC6XsP3DfWpyF5pyLAhhok5OjrT14Y4sxSY/rs:fit:522:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/aVdrZm9EWUZjMWt1/YWM0T1ZBbUxnSGFH/dSZwaWQ9QXBp" alt="" width="60" height="60" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className= "nav-link" to='/admin/Estudiantes'>Estudiantes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/admin/hospitales'>Hospitales</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Salir</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavigation;
