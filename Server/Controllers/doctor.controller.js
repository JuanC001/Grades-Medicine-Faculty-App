import student from '../models/estudent.js';
import hospital from '../models/hospital.js';
import user from '../models/user.js';

const docCtrl = {};

docCtrl.CambiarPass = (req,res) => {

    const {id, pass, npass, npassv} = req.body;

    const testUser = user.findById(id);

    if(pass === testUser.password){

        const usuario = user.findByIdAndUpdate(id, {

            password: npass
    
        });

        

    }
    
    


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


