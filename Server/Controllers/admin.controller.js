import path from 'path';
import { fileURLToPath } from 'url';

import student from '../models/estudent.js';
import hospital from '../models/hospital.js';
import User from '../models/user.js';

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

    res.json({

        "respuesta": respuesta,
        'id': newStudent._id

    });



}

admCtrl.ModifEstudiante = async (req, res) => {

    // modificar el estudiante
    const { ed_nombres, documento, correo, semestre, rotaciones, _id } = req.body;

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

    for (let i = 0; i < rotaciones.length; i++) {

        console.log("Buscando:" + rotaciones[i].nombre_hospital)
        let rotacion = rotaciones[i].id_hospital;
        const a = await hospital.findById(rotacion);
        if (a != null) {
            let estudiantesAf = a.estudiantesAfiliados;
            estudiantesAf.splice(estudiante._id)
            await hospital.findByIdAndUpdate(rotacion, { estudiantesAfiliados: estudiantesAf });
        }

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

    const { nombre_hospital, id_est } = req.body;

    const hospitalres = await hospital.findOne({ nombre_hospital: nombre_hospital });

    const estudiantesAf = hospitalres.estudiantesAfiliados;

    if (estudiantesAf.length > 0) {
        for (let i = 0; i < estudiantesAf.length; i++) {

            if (estudiantesAf[i] != id_est) {
                estudiantesAf.push(id_est);
            }

        }
    } else {
        estudiantesAf.push(id_est);
    }

    const actual = await hospital.findByIdAndUpdate(hospitalres._id, { estudiantesAfiliados: estudiantesAf });
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

admCtrl.allExcelHospitales = async (req, res) => {

    const lista = req.body;
    const nuevo = lista.slice(2, lista.length)

    for (let i = 0; i < nuevo.length; i++) {

        let repetido = false;

        if(await hospital.findOne({nombre_hospital: nuevo[i].nombre_hospital}) !== null){

            console.log("repetido!")
            repetido = true;

        }

        if(!repetido){
            let hospitalN = {

                nombre_hospital: nuevo[i].nombre_hospital,
                nombre_lider: nuevo[i].nombre_lider,
                correo_administrador: nuevo[i].correo_administrador,
                cupo: nuevo[i].cupo,
                cupoDisponible: nuevo[i].cupo
    
            }
    
            let user = {
    
                nombre: nuevo[i].nombre_lider,
                user: nuevo[i].correo_administrador,
                password: nuevo[i].nombre_hospital + nuevo[i].cupo,
                email: nuevo[i].correo_administrador,
                rol: 'doctor',
                hospital: nuevo[i].nombre_hospital
    
            }
    
            await hospital.create(hospitalN);
    
            if(await User.findOne({hospital: nuevo[i].nombre_hospital}) === null){
    
                await User.create(user)
    
            }
        }
        


    }

    res.json({ terminado: true })

}

admCtrl.allExcelEstudiantes = async (req, res) => {

    const lista = req.body;
    const nuevo = lista.slice(2, 80);

    let hayrepetidos = false;
    let hayErrores = false;
    let repetidos = '';
    let conErrores = '';

    for (let i = 0; i < nuevo.length; i++) {

        if (await student.findOne({ documento: nuevo[i].documento }) !== null) {

            hayrepetidos = true
            repetidos += nuevo[i].nombres + ' CC: ' + nuevo[i].documento + '; \n';

        } else {

            let hospitalres = await hospital.findOne({ nombre_hospital: nuevo[i].rotacionActual });
            let hspid = 'no definido'
            if (hospitalres !== null) {
                hspid = hospitalres._id
            }

            let nombreHospital = nuevo[i].rotacionActual.toUpperCase();

            let rotacionInit = [{

                id: 0,
                nombre_hospital: nombreHospital,
                fechaInicial: 'Diciembre',
                fechaFinal: 'Enero',
                nota: 'no definido',
                area: 'no definido',
                id_hospital: hspid

            }]

            let estudianteF = {

                nombres: nuevo[i].nombres.toUpperCase(),
                documento: nuevo[i].documento,
                correo: nuevo[i].correo,
                rotacionActual: nuevo[i].rotacionActual,
                semestre: 11,
                rotaciones: rotacionInit

            }

            try {
                const estudent0 = await student.create(estudianteF)
                if (hospitalres !== null) {
                    const estudiantesAf = hospitalres.estudiantesAfiliados;
                    if (estudiantesAf.length > 0) {
                        let isIn = false;
                        for (let i = 0; i < estudiantesAf.length; i++) {

                            if (estudiantesAf[i] === estudent0._id) {
                                isIn = true
                            }

                        }

                        if (!isIn) {

                            estudiantesAf.push(estudent0._id);

                        }

                    } else {
                        estudiantesAf.push(estudent0._id);
                    }

                    await hospital.findByIdAndUpdate(hospitalres._id, { estudiantesAfiliados: estudiantesAf });

                }
            } catch (error) {

                hayErrores = true;
                conErrores += 'Revise => ' + nuevo[i].nombres;

            }



        }

    }

    if (hayrepetidos || hayErrores) {

        res.json({
            txrepetidos: repetidos,
            errores: conErrores
        });

    } else {
        res.json({ txrepetidos: null, errores: null });
    }

}

admCtrl.OtenerFirma = (req,res) => {

    const {img_url} = req.body;
    const urlfi = '..' + img_url;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const url = path.join(__dirname, urlfi);

    console.log(url)

    res.sendFile(url);

}

export default admCtrl;



