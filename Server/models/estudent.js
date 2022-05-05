import mongoose from "mongoose";
const {Schema, Model} = mongoose;

const estudiantesSchema = new Schema({

    nombres : {type:String, required:true},
    documento: {type:String, required:true},
    correo: {type:String, required:true},
    rotacionActual: {type:String, required:true},
    semestre: {type:Number, required:true},

    rotacion1 : {

        lugar : {type:String, required:false},
        fechaInicial: {type:Date, required:false},
        fechaFinal: {type:Date, required:false},
        nota: {type:Number, required:false},

        
    },

    rotacion2 : {

        lugar : {type:String, required:false},
        fechaInicial: {type:Date, required:false},
        fechaFinal: {type:Date, required:false},
        nota: {type:Number, required:false},

    },

    rotacion3 : {

        lugar : {type:String, required:false},
        fechaInicial: {type:Date, required:false},
        fechaFinal: {type:Date, required:false},
        nota: {type:Number, required:false},

    },

    rotacion4 : {

        lugar : {type:String, required:false},
        fechaInicial: {type:Date, required:false},
        fechaFinal: {type:Date, required:false},
        nota: {type:Number, required:false},

    },

    rotacion5 : {

        lugar : {type:String, required:false},
        fechaInicial: {type:Date, required:false},
        fechaFinal: {type:Date, required:false},
        nota: {type:Number, required:false},

    },

    rotacion6 : {

        lugar : {type:String, required:false},
        fechaInicial: {type:Date, required:false},
        fechaFinal: {type:Date, required:false},
        nota: {type:Number, required:false},

    },

});

const exportSchema = mongoose.model('estudiantesSchema', estudiantesSchema);
export default exportSchema;