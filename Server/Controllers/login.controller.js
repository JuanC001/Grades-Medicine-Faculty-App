import User from '../models/user.js';

const ctrl = {};

ctrl.loginPage = (req, res) => {

    res.send('Estas en Login');

}

ctrl.login = async (req, res) => {
    // Verificar inicio de sesion!

    const { user, password } = req.body;
    console.log(user, password);

    const usuario = await User.findOne({ user: user });


    if (usuario) {
        console.log(usuario.password);
        if (usuario.password == password) {

            console.log("FUNCIONO XD");
            res.json(usuario);

        } else {

            console.log("No funcionó, mancos todos :v");
            res.json(null);

        }
    } else {
        res.json(null);
    }


}

ctrl.registrar = (req, res) => {

    try {
        const { nombre, user, password, email, rol, hospital } = req.body;

        const newUser = new User({

            nombre: nombre,
            user: user,
            password: password,
            email: email,
            rol: rol,
            hospital: hospital

        });

        if (User.create(newUser)) {

            res.json({ register: 'complete' });

        };
    } catch (e) {

        res.json({ register: 'no complete'});

    }

}

ctrl.eliminarCuenta = async (req, res) => {

    try {
        const { user } = req.body;
        await User.deleteOne({user: user});
        res.json({ delete: 'complete' });
    } catch (e) {

        res.json({ delete: 'no complete' });

    }

}

export default ctrl;