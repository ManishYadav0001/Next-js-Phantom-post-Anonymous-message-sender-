import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {


    if (isConnected) {
        console.log("✅ Using existing database connection");
        return;
    }
    try {
        const result = await mongoose.connect(`${process.env.DB_URI}/AnonymousUser`)
        isConnected = result.connections[0].readyState === 1;
        console.log("DB CONNECTED SUCCESSFULLY!")



    } catch (error) {
        console.log("DB CONNECTION ERROR!!", error)
        process.exit(1);
    }
}