import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";


import AdmEstudiantes from '../pages/Administrador/Admin/Estudiantes';
import AdmHospitales from '../pages/Administrador/Admin/Hospitales';

import Home from '../pages/Home/Home';

import Estudiantes from '../pages/Doctores/Estudiantes';
import DocCuenta from '../pages/Doctores/Cuenta'

const Routes = () => {
    return (
        <div>
        <BrowserRouter>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="admin/Estudiantes" element={<AdmEstudiantes />} />
          <Route path="admin/Hospitales" element={<AdmHospitales />} />
          <Route path="doctor/estudiantes/:hospital" element={<Estudiantes />} />
          <Route path="doctor/micuenta/" element={<DocCuenta />} />
        </Switch>
      </BrowserRouter>
      </div>
    );
}

export default Routes;
