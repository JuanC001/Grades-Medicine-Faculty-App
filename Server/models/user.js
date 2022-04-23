import mongoose from "mongoose"
const {Schema, model} = mongoose;

const userSchem = new Schema({

    nombre: {type: 'string', required: true},
    user : {type: 'string', required: true},
    password : {type: 'string', required: true},
    email : {type: 'string', required: true},
    rol: {type: 'string', required: true}

});

const exportModule = mongoose.model('user', userSchem)
export default exportModule;