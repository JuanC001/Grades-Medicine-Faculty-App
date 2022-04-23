import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Estudiantes from '../pages/administrador/Admin/Estudiantes';
import Hospitales from '../pages/administrador/Admin/Hospitales';
import Home from '../pages/home/Home';



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
