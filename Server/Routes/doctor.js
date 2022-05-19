import Express from "express";
import doctorControl from '../Controllers/doctor.controller.js'

const Router = Express.Router();

//post

Router.post('/api/doctor/estudiantes', doctorControl.ObtenerEstudiantes);
Router.post('/api/doctor/cambiarPass', doctorControl.CambiarPass);

//get

Router.get('/api/doctor/:hospital', doctorControl.ObtenerHospital);


export default Router;