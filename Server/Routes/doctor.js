import Express from "express";
import doctorControl from '../Controllers/doctor.controller.js'

import multer from 'multer';
const upload = multer({dest: './uploads'});

const Router = Express.Router();

//post

Router.post('/api/doctor/estudiantes', doctorControl.ObtenerEstudiantes);
Router.post('/api/doctor/cambiarPass', doctorControl.CambiarPass);
Router.post('/api/doctor/asignarNota', doctorControl.AsignarNota);
Router.post('/api/doctor/asignarArea', doctorControl.AsignarArea);
Router.post('/api/doctor/recibirFirma', upload.single('image'), doctorControl.RecibirFirma);

//get

Router.get('/api/doctor/:hospital', doctorControl.ObtenerHospital);

export default Router;