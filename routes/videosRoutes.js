const express=require("express");
const videosRouter=express.Router();
const fs=require("fs");
const {v4:uuidv4}=require("uuid");
const FILE_PATH="./data/videosData.json";

const readVideos=()=>{
    const videosData=fs.readFileSync(FILE_PATH);
    const parseVideos=JSON.parse(videosData);
    return parseVideos;
}
