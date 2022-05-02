import student from '../models/estudent.js';
import hospital from '../models/hospital.js';
const admCtrl = {};

admCtrl.ObtenerUnEstudiante = async (req, res) => {

    const { _id } = req.body;
    const estudiante = await student.findById(_id);
    res.json(estudiante);

}

admCtrl.ObtenerEstudiantes = async (req, res) => {

    const estudiantes = await student.find();
    res.json(estudiantes);
    console.log("Envio de estudiantes completado!")

}

admCtrl.RegisEstudiante = (req, res) => {


    // registro estudiante
    const { reg_nombres, documento, correo, lugar1, fechaInicial, fechaFinal, semestre } = req.body;
    console.log(req.body);
    let respuesta = "correcto";

    if (reg_nombres == '' || documento == '' || correo == '') {

        console.log("Esta VACIO!!");
        respuesta = "incorrecto";

    }

    const newStudent = new student({

        nombres: reg_nombres,
        documento: documento,
        correo: correo,
        semestre: semestre,
        rotacionActual: lugar1,

        rotacion1: {

            "id_r": 1,
            lugar: lugar1,
            fechaInicial: fechaInicial,
            fechaFinal: fechaFinal,
            nota: 0

        },

        rotacion2: {

            nota: 0

        },
        rotacion3: {
            nota: 0
        },
        rotacion4: {
            nota: 0
        },
        rotacion5: {
            nota: 0
        },
        rotacion6: {
            nota: 0
        }

    });

    try {
        if (respuesta != "incorrecto") {

            student.create(newStudent);

        }



    } catch (e) {
        respuesta = "incorrecto"
    }

    res.json({

        "respuesta": respuesta,

    });



}

admCtrl.ModifEstudiante = async (req, res) => {

    // modificar el estudiante
    const { ed_nombres, documento, correo, semestre, _id } = req.body;

    await student.findByIdAndUpdate(_id, {

        nombres: ed_nombres,
        documento: documento,
        correo: correo,
        semestre: semestre

    })

    res.json({ finalizado: true })


}

admCtrl.ElimEstudiante = async (req, res) => {

    // eliminar el estudiante
    const { _id } = req.body;
    await student.findByIdAndDelete(_id);

    res.json({ terminado: true });

}

admCtrl.ObtenerHospitales = async (req, res) => {

    const hospitales = await hospital.find();
    res.json(hospitales);

}

admCtrl.ObtenerUnHospital = async (req, res) => {

    const { _id } = req.body;
    const hsp = await hospital.findById(_id);
    res.json(hsp);

}

admCtrl.RegisHospital = (req, res) => {

    //Registrar hospital
    const { nombre, n_lider, correo, cupo } = req.body;

    const newHospital = new hospital({

        nombre_hospital: nombre,
        nombre_lider: n_lider,
        correo_administrador: correo,
        cupo: cupo,
        cupoDisponible: cupo

    });

    if (hospital.create(newHospital)) {
        res.json({ registera: 'complete' })
    } else {
        res.json({ registera: 'no complete' })
    }

}

admCtrl.ModifHospital = async (req, res) => {

    //Registrar hospital
    console.log('MODIFICAR')
    try {
        const { nombre_hospital, nombre_lider, correo_administrador, cupo, _id } = req.body;
        await hospital.findByIdAndUpdate(_id, {

            nombre_hospital: nombre_hospital,
            nombre_lider: nombre_lider,
            correo_administrador: correo_administrador,
            cupo: cupo

        })

        res.json({ finalizado: true })
    }
    catch (err) {
        res.json({ finalizado: false })
    }

}

admCtrl.ElimHospital = async (req, res) => {

    //Registrar hospital
    const { _id } = req.body;
    await hospital.findByIdAndDelete(_id);
    res.json({ terminado: true });

}

export default admCtrl;



