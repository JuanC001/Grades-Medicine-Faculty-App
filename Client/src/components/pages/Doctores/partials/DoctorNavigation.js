import React from 'react';

import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Container, Navbar, Nav } from 'react-bootstrap'

//import './css/AdminNavigation.css'


const DoctorNavigation = (props) => {

    const direccionMain = `/doctor/estudiantes/`

    return (

        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/doctor/Estudiantes">


                    <img
                        src="https://imgs.search.brave.com/bNg6um44OC6XsP3DfWpyF5pyLAhhok5OjrT14Y4sxSY/rs:fit:522:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5z/aVdrZm9EWUZjMWt1/YWM0T1ZBbUxnSGFH/dSZwaWQ9QXBp"
                        width="50"
                        height="50"
                        className="d-inline-block align-start"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to= {direccionMain}><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /> Estudiantes</NavLink>
                        <NavLink className='nav-link' to='/doctor/miCuenta'><FontAwesomeIcon icon="fa-solid fa-hospital-user" /> Mi Cuenta</NavLink>
                        <NavLink className="nav-link" to='/'> Salir</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default DoctorNavigation;
