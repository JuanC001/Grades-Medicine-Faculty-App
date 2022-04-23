import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavigation.css'


const AdminNavigation = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white ">
                <div className="container-fluid bg-white">
                    <a className="navbar-brand "  href="#"><img src="https://imgs.search.brave.com/bNg6um44OC6XsP3DfWpyF5pyLAhhok5OjrT14Y4sxSY/rs:fit:522:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/aVdrZm9EWUZjMWt1/YWM0T1ZBbUxnSGFH/dSZwaWQ9QXBp" width="120" height="100" alt=""></img></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse p-3 mb-2 bg-white " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active shadow p-3 mb-5 bg-body rounded">
                                <Link className="nav-link text-success" to='/admin/Estudiantes'>Estudiantes</Link>
                            </li>
                            <li className="nav-item shadow p-3 mb-5 bg-body rounded">
                                <Link className="nav-link text-success" to='/admin/hospitales'>Hospitales</Link>
                            </li>
                            <li className="nav-item shadow p-3 mb-5 bg-body rounded">
                                <Link className="nav-link text-success" to='/'>Salir</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default AdminNavigation;
