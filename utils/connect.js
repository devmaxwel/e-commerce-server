import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function connect(){

    const DB_URI = process.env.DB_URI
    try {
        await mongoose.connect(DB_URI)
        console.info("successful connection to mongodb.com");
    } catch (err) {
        console.error(`Database not connected, internal server error occured:${err.message}`);
    }
}

export default connect;