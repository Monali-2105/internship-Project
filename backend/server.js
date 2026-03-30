import app from "./app.js"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();
import {v2 as cloudinary} from "cloudinary";
connectDB();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
//handle uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to uncaught exception errors`);
    process.exit(1);
})
    
const port = process.env.PORT || 5000;


const server = app.listen(port,()=>{
    console.log("server running on port "+port)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`);
    
    server.close(()=>{
        process.exit(1);
    })
})
