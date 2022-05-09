import Express from "express";
import doctorControl from '../Controllers/doctor.controller.js'

const Router = Express.Router();

Router.post('/api/doctor/estudiantes', doctorControl.ObtenerEstudiantes);
Router.get('/api/doctor/:hospital', doctorControl.ObtenerHospital);



export default Router;