import mongoose from "mongoose";

export async function conectDB () {

    try {
        await mongoose.connect('mongodb://localhost:27017/mernLogin')
        console.log('conectado exitosamente a la base de datos')
    } catch (err) {
        console.log('error al conectar a la base de datos')
        console.log(err)
    }
}