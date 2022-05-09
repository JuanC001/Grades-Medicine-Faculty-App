import mongoose from "mongoose";
const {Schema, Model} = mongoose;

const estudiantesSchema = new Schema({

    nombres : {type:String, required:true},
    documento: {type:String, required:true},
    correo: {type:String, required:true},
    rotacionActual: {type:String, required:true},
    semestre: {type:Number, required:true},

    rotaciones: []

});

const exportSchema = mongoose.model('estudiantes', estudiantesSchema);
export default exportSchema;