import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./db/index.js";




dotenv.config({
    path:".env"
})

const port=process.env.PORT||5000;


connectDB()
.then(()=>{
    app.listen(port, () => {
      console.log(`app is Listening on port http://localhost:${port}`);
    });
})
.catch((err)=>{
    console.error("error in connection",err);
    process.exit(1);
})


