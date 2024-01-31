const express=require("express");
const videosRouter=express.Router();
const fs=require("fs");
//const {v4:uuidv4}=require("uuid");
const FILE_PATH="./data/videosData.json";

const readVideos=()=>{
    const videosData=fs.readFileSync(FILE_PATH);
    const parseVideos=JSON.parse(videosData);
    //only return the videoDetails
    return parseVideos.videoDetails;
}
videosRouter.get("/",(req,res)=>{
    const videosData=readVideos();
    res.status(200).json(videosData);
})
videosRouter.get("/:videoId",(req,res)=>{
    const videosData=readVideos();
    const singleVideo=videosData.find((videoData)=>videoData.id===req.params.videoId);
    if (singleVideo) {
        res.json(singleVideo);
    } else {
        res.status(404).send('No video with that id exists');
    }
})
videosRouter.post("")
module.exports=videosRouter;
