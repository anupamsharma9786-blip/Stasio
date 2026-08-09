import dotenv from "dotenv";

dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Mongo URI noit defined in env variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT Secret not defined in env variables")
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}