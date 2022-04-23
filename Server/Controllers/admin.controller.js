import student from '../models/estudent.js';
import hospital from '../models/hospital.js';
const admCtrl = {};

admCtrl.ObtenerEstudiantes = async (req,res) => {

    const estudiantes = await student.find();
    res.json(estudiantes);
    
}

admCtrl.RegisEstudiante = (req,res) => {


    // registro estudiante
    const {reg_nombres, documento, correo, lugar1, fechaInicial, fechaFinal} = req.body;
    console.log(req.body);


    const newStudent = new student({

        nombres: reg_nombres,
        documento: documento,
        correo: correo,

        rotacion1: {

            "id_r" : 1,
            lugar: lugar1,
            fechaInicial: fechaInicial,
            fechaFinal: fechaFinal,
            nota: 0

        },

        rotacion2: {

            nota : 0

        },
        rotacion3: {
            nota : 0
        },
        rotacion4: {
            nota : 0
        },
        rotacion5: {
            nota : 0
        },
        rotacion6: {
            nota : 0
        }

    });

    student.create(newStudent);
    res.json({

        "nombre": reg_nombres,
        "documento": documento,
        "correo": correo

    })


}

admCtrl.ModifEstudiante = (req,res) => {

    // modificar el estudiante

}

admCtrl.ElimEstudiante = (req,res) => {

    // eliminar el estudiante

}

admCtrl.ObtenerHospitales = async (req,res) => {

    const hospitales = await hospital.find();
    res.json(hospitales);

}

admCtrl.RegisHospital = (req,res) => {

    //Registrar hospital
    const {nombre, n_lider, correo, cupo} = req.body;

    const newHospital = new hospital ({

        nombre_hospital: nombre,
        nombre_lider:n_lider,
        correo_administrador: correo,
        cupo: cupo

    });

    if(hospital.create(newHospital)){
        res.json({registera: 'complete'})
    }else{
        res.json({registera: 'no complete'})
    }

}

admCtrl.ModifHospital = (req,res) => {

    //Registrar hospital

}

admCtrl.ElimHospital = (req,res) => {

    //Registrar hospital

}

export default admCtrl;



