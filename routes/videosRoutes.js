const express = require("express");
const videosRouter = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const FILE_PATH = "./data/videosData.json";

const readVideos = () => {
  const videosData = fs.readFileSync(FILE_PATH);
  const parseVideos = JSON.parse(videosData);
  //only return the videoDetails
  return parseVideos.videoDetails;
};
const writeVideos = (videos) => {
  fs.writeFileSync(
    FILE_PATH,
    JSON.stringify({ videoDetails: videos }, null, 2)
  );
};

videosRouter.get("/", (req, res) => {
  const videosData = readVideos();
  res.status(200).json(videosData);
});

videosRouter.get("/:videoId", (req, res) => {
  const videosData = readVideos();
  const singleVideo = videosData.find(
    (videoData) => videoData.id === req.params.videoId
  );
  if (singleVideo) {
    res.json(singleVideo);
  } else {
    res.status(404).send("No video with that id exists");
  }
});

videosRouter.post("/:videoId/comments", (req, res) => {
  const videoObj = req.body;
  console.log(req.body);
  const newComment = {
    id: uuidv4(),
    name: videoObj.name,
    comment: videoObj.comment,
    timestamp: Date.now(),
  };
  const videosData = readVideos();
  const singleVideo = videosData.find(
    (videoData) => videoData.id === req.params.videoId
  );
  singleVideo.comments.push(newComment);
  fs.writeFileSync(FILE_PATH, JSON.stringify({ videoDetails: videosData }));
  res.status(201).json(newComment);
  return newComment;
});

videosRouter.post("/upload", (req, res) => {
  const videosData = readVideos();
  const videoObj = req.body;
  const newVideo = {
    id: uuidv4(),
    title: videoObj.title,
    description: videoObj.description,
    image: videoObj.image,
    comments: [],
  };
  videosData.push(newVideo);
  writeVideos(videosData);
  res.status(201).json(newVideo);
});
module.exports = videosRouter;
