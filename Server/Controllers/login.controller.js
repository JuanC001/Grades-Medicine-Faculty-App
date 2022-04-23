import e from 'express';
import User from '../models/user.js';

const ctrl = {};

ctrl.loginPage = (req, res) => {

    res.send('Estas en Login');

}

ctrl.login = async (req, res) => {
// Verificar inicio de sesion!

    const {user, password} = req.body;
    console.log(user,password);

    const usuario = await User.findOne({user: user});
    

    if(usuario){
        console.log(usuario.password);
        if (usuario.password == password){

            console.log("FUNCIONO XD");
            res.json(usuario);
    
        }else{
    
            console.log("No funcionó, mancos todos :v");
            res.json(null);
    
        }
    }else{
        res.json(null);
    }
    

}

ctrl.registrar = (req, res) => {

    const {nombre, user, password, email, rol} = req.body;
    
    const newUser = new User({

        nombre: nombre,
        user: user,
        password: password,
        email: email,
        rol: rol,

    })

    if(User.create(newUser)){

        res.json({register: 'complete'})

    };

}

export default ctrl;