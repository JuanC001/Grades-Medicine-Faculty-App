import Express from "express";
import adminControl from '../Controllers/admin.controller.js'

const Router = Express.Router();
const { RegisEstudiante,
        ModifEstudiante,
        ElimEstudiante,
        RegisHospital,
        ModifHospital,
        ElimHospital,
        ObtenerEstudiantes,
        ObtenerHospitales,
        ObtenerUnEstudiante } = adminControl;

Router.post('/api/admin/regisEstudiante', RegisEstudiante);
Router.post('/api/admin/RegisHospital', RegisHospital);
Router.post('/api/admin/eliminarEstudiante' , ElimEstudiante)
Router.post('/api/admin/unEstudiante', ObtenerUnEstudiante);
Router.get('/api/admin/allStudents', ObtenerEstudiantes);
Router.get('/api/admin/allHospital', ObtenerHospitales);

export default Router;