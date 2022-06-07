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
        ObtenerUnEstudiante,
        ObtenerUnHospital,
        agregarEstudianteAHospital,
        allExcelEstudiantes,
        allExcelHospitales } = adminControl;

Router.post('/api/admin/excEstudiante', allExcelEstudiantes);
Router.post('/api/admin/excHospital', allExcelHospitales);

Router.post('/api/admin/regisEstudiante', RegisEstudiante);
Router.post('/api/admin/regisEstudianteHsp', agregarEstudianteAHospital);
Router.post('/api/admin/RegisHospital', RegisHospital);
Router.post('/api/admin/eliminarEstudiante' , ElimEstudiante)
Router.post('/api/admin/eliminarHospital' , ElimHospital)
Router.post('/api/admin/unEstudiante', ObtenerUnEstudiante);
Router.post('/api/admin/unHospital', ObtenerUnHospital);
Router.post('/api/admin/modEst', ModifEstudiante);
Router.post('/api/admin/modHsp', ModifHospital);


Router.get('/api/admin/allStudents', ObtenerEstudiantes);
Router.get('/api/admin/allHospital', ObtenerHospitales);


export default Router;