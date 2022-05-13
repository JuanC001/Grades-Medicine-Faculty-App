import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";


import AdmEstudiantes from '../pages/Administrador/Admin/Estudiantes';
import AdmHospitales from '../pages/Administrador/Admin/Hospitales';

import Home from '../pages/Home/Home';

import Estudiantes from '../pages/Doctores/Estudiantes';
import DocCuenta from '../pages/Doctores/Cuenta'

const Routes = () => {

  const [user, setUser] = useState({})

  useEffect(() => {

    setUser({})

  }, [])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<Home setstatemt={setUser} />} />
          <Route path="admin/Estudiantes" element={<AdmEstudiantes />} />
          <Route path="admin/Hospitales" element={<AdmHospitales />} />
          <Route path="doctor/estudiantes/" element={<Estudiantes user={user} setstatemt={setUser} />} />
          <Route path="doctor/micuenta/" element={<DocCuenta user={user} setstatemt={setUser} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
