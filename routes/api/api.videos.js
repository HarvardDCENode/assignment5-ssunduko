//users.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const videoController = require('../../controllers/videoController');
const upload = multer({});
const VideoService = videoController.VideoService;

router.use((req, res, next)=>{
    res.set({
        // Allow any domain, allow REST methods we've implemented
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers',
        'Content-type':'application/json'
    });
    if (req.method === 'OPTIONS'){
        return res.status(200).end();
    }
    next();
});

/**
 * Read All Videos
 */
router.get('/', (req, res, next)=>{

    VideoService.list()
        .then((videos) => {
            console.log(`List of Videos: ${videos}`);
            res.status(200);
            res.send(JSON.stringify(videos));
        });
});

/**
 * Read Video
 */
router.get('/:videoid', (req, res, next)=>{

    console.log(`looking for ${req.params.videoid}`);
    VideoService.read(req.params.videoid)
        .then((video) => {
            console.log(`Found Video: ${video}`);
            res.status(200);
            res.send(JSON.stringify(video));
        }).catch((err)=>{
            res.status(404);
            res.end();
        });
});

/**
 * Update Video
 */
router.put('/:videoid', (req, res, next)=>{

    console.log(`updating ${req.params.videoid}`);
    let data = req.body;
    VideoService.update(req.params.videoid, data)
        .then((updatedVideo)=>{
            console.log(`Updated Video: ${updatedVideo}`);
            res.status(200);
            res.send(JSON.stringify(updatedVideo));
        }).catch((err)=> {
            res.status(404);
            res.end();
        });
 });

/**
 * Create Video
 */
router.post('/', upload.none(), async (req, res, next)=>{

    let reviews = JSON.parse(req.body.reviews, (key, value) => {
        if (typeof value === 'string') {
            return value;
        }
        return value;
    });

    const video  = {
        title: req.body.title,
        description: req.body.description,
        averageRating: req.body.averageRating,
        reviews : [{
            rating: reviews.rating,
            review: reviews.review
        }]
    }

    console.log('creating ' + JSON.stringify(video));
    try{
        const videoSave = await VideoService.create(video)
        console.log(`created ${videoSave.id}`);
        res.status(201);
        res.send(JSON.stringify(videoSave));
    }catch(err){
        console.log(err);
        throw new Error("VideoSaveError", video);
    }
});

/**
 * Delete Video
 */
router.delete('/:videoid', (req, res, next)=>{
    let id = req.params.videoid;
    VideoService.delete(req.params.videoid)
        .then((video) => {
            console.log(`Deleted Video: ${id}`);
            res.status(200);
            res.send(JSON.stringify(video));
        }).catch((err)=> {
            res.status(404);
            res.end();
        });
});

/**
 * Error
 */
router.use(function(err, req, res, next){
    console.error(err);
    res.status(500);
    res.end();
});

module.exports = router;
