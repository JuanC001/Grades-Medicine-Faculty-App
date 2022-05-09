import student from '../models/estudent.js';
import hospital from '../models/hospital.js';

const docCtrl = {};

docCtrl.Formulario = (req,res) => {

    // formulario de notas

}

docCtrl.ObtenerHospital= async (req,res) => {

    const hospital_name = req.params.hospital;

    const hospitaln = await hospital.find({nombre_hospital: hospital_name});
    res.json(hospitaln)

}

docCtrl.ObtenerEstudiantes = async (req,res) => {
    
    const {estudiantesafiliados} = req.body;
    const estud = []

    for (let i=0; i< estudiantesafiliados.length ; i++) {
        const estudiante = await student.findById(estudiantesafiliados[i]);
        estud.push(estudiante);
    }

    res.json(estud);

}

export default docCtrl;


