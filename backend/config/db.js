import mongoose from "mongoose";

import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);

export const connectDB=()=>{
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected")
})
}


