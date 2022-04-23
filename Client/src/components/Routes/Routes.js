import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Estudiantes from '../pages/Administrador/Admin/Estudiantes';
import Hospitales from '../pages/Administrador/Admin/Hospitales';
import Home from '../pages/Home/Home';



const Routes = () => {
    return (
        <div>
        <BrowserRouter>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="admin/Estudiantes" element={<Estudiantes />} />
          <Route path="admin/Hospitales" element={<Hospitales />} />
        </Switch>
      </BrowserRouter>
      </div>
    );
}

export default Routes;
