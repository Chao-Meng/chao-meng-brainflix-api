require("dotenv").config();
const express=require("express");
const app=express();
const videosRoutes=require("./routes/videosRoutes.js")
const cors=require("cors");
const PORT=process.env.PORT||8081;
//allow cross-origin requests and is enabled for all sources by default
app.use(cors());
app.use("/videos",videosRoutes);
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})
