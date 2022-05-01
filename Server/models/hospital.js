import mongoose from "mongoose";

const hospSchema = new mongoose.Schema({

    nombre_hospital: {type: String,required: true},
    nombre_lider: {type: String,required: true},
    correo_administrador: {type: String,required: true},
    cupo: {type: Number,required: true},
    cupoDisponible: {type: Number,required: true},
    

    estudiantesAfiliados: {type: Array, required: false},

});

const exportSchema = mongoose.model('Hospitales', hospSchema);
export default exportSchema;