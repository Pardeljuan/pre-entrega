import dotenv from "dotenv";
dotenv.config();
import { connect, Types } from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
    const URL = MONGO_URL;

    try {
        await connect(URL);
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.log("Error al conectar con MongoDB", error.message);
    }
};

export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};