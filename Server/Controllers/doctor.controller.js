import student from '../models/estudent.js';
import hospital from '../models/hospital.js';
import user from '../models/user.js';

const docCtrl = {};

docCtrl.CambiarPass = async (req, res) => {

    const { id, pass, npass } = req.body;

    const auxUser = await user.findById(id);

    if (pass === auxUser.password) {

        const usuario = await user.findByIdAndUpdate(id, {

            password: npass

        });

        res.json({ confirmado: true })
        return;
    }

    res.json({ confirmado: false })
    return;
}

docCtrl.ObtenerHospital = async (req, res) => {

    const hospital_name = req.params.hospital;

    const hospitaln = await hospital.findOne({ nombre_hospital: hospital_name });
    res.json(hospitaln)

}

docCtrl.ObtenerEstudiantes = async (req, res) => {

    const { estudiantesafiliados } = req.body;
    const estud = []

    for (let i = 0; i < estudiantesafiliados.length; i++) {
        const estudiante = await student.findById(estudiantesafiliados[i]);
        estud.push(estudiante);
    }

    res.json(estud);

}

docCtrl.AsignarArea = async (req, res) => {

    const { id, id_r, area } = req.body;

    try {
        const std = await student.findById(id);

        const rotaciones = std.rotaciones;

        for (let i = 0; i < rotaciones.length; i++) {

            console.log(rotaciones[i].id + ' & ' + id_r)

            if (rotaciones[i].id === parseInt(id_r)) {

                rotaciones[i].area = area;
                console.log('Cambiando!')

            }

        }

        const est = await student.findByIdAndUpdate(id, { rotaciones: rotaciones });
        res.json({ estudiante: est })

    } catch (e) {

        console.log(e)

        res.json({ term: false })
    }

}

docCtrl.AsignarNota = async (req, res) => {

    const { c1, c2, c3, c4, c5, srvs, cmt, id, id_r } = req.body;

    const re = await student.findById(id);

    const rotaciones = re.rotaciones;

    for (let i = 0; i < rotaciones.length; i++) {

        if (rotaciones[i].id == id_r) {

            rotaciones[i].nota = {

                c1: c1,
                c2: c2,
                c3: c3,
                c4: c4,
                c5: c5,
                srvs: srvs,
                cmt: cmt

            }

        }

    }

    const ff = await student.findByIdAndUpdate(id, { rotaciones: rotaciones });

    res.json({ terminado: true })
    console.log(ff)


}

export default docCtrl;


