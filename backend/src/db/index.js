import mongoose  from "mongoose";

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ mongoDb Connected");
        
    }catch(error)
    {
        console.log("❌ mongoDb NotConnected");
        process.exit(1);
    }
}

export default connectDB;