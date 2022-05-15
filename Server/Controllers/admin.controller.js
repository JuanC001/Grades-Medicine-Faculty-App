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
    const { reg_nombres, documento, correo, semestre, rotaciones } = req.body;
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
        rotaciones: rotaciones,
        rotacionActual: 'No asignado aun',

    });

    try {
        if (respuesta != "incorrecto") {

            student.create(newStudent);

        }



    } catch (e) {
        respuesta = "incorrecto"
    }

    console.log('asjodnaosfa' + newStudent._id);

    res.json({

        "respuesta": respuesta,
        'id': newStudent._id

    });



}

admCtrl.ModifEstudiante = async (req, res) => {

    // modificar el estudiante
    const { ed_nombres, documento, correo, semestre, rotaciones,_id } = req.body;

    await student.findByIdAndUpdate(_id, {

        nombres: ed_nombres,
        documento: documento,
        correo: correo,
        semestre: semestre,
        rotaciones: rotaciones

    })

    res.json({ finalizado: true })


}

admCtrl.ElimEstudiante = async (req, res) => {

    // eliminar el estudiante
    const { _id } = req.body;
    const estudiante = await student.findById(_id);
    const rotaciones = estudiante.rotaciones;

    for (let i = 0; i < rotaciones.length; i++){

        console.log("Buscando:" + rotaciones[i].nombre_hospital)
        let rotacion = rotaciones[i].id_hospital;
        const a = await hospital.findById(rotacion);
        let estudiantesAf = a.estudiantesAfiliados;
        estudiantesAf.splice(estudiante._id)
        await hospital.findByIdAndUpdate(rotacion, {estudiantesAfiliados: estudiantesAf});
        console.log(a)

    }

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

admCtrl.agregarEstudianteAHospital = async (req, res) => {

    const {nombre_hospital, id_est} = req.body;

    const hospitalres = await hospital.findOne({nombre_hospital: nombre_hospital});
    const estudiantesAf = hospitalres.estudiantesAfiliados;
    estudiantesAf.push(id_est);

    const actual = await hospital.findByIdAndUpdate(hospitalres._id, {estudiantesAfiliados: estudiantesAf});

    res.json(actual)

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

admCtrl.allExcelEstudiantes = async (req,res) =>{

    const lista = req.body;
    //console.log(lista)
    const nuevo = lista.slice(2,80);
    //console.log(nuevo);
    await student.insertMany(nuevo);
    console.log("no entra");
    let respuesta = await student.updateMany({},{semestre : 11});
    res.send(respuesta);
    console.log(respuesta);
}

export default admCtrl;



