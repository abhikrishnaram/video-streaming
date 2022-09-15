const express = require('express')
const router = express.Router()
const videos = require('./metadata')
const cors = require('cors')
const fs = require('fs')

router.get('/', (req,res)=>{
    res.json(videos)
})

router.get('/:id/metadata', (req,res)=> {
    const id = parseInt(req.params.id, 10)
    res.json(videos[id])
})

router.get('/:id', (req, res) => {
    const videoPath = `assets/${req.params.id}.mp4`;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    
    if (videoRange) {

        const parts = videoRange.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]? parseInt(parts[1], 10) : fileSize-1;  
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(videoPath, {start, end});
        const header = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, header);
        file.pipe(res);

    } else {

        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);

    }
});

router.get('/:id/caption', cors(), (req, res) => {
    res.sendFile(`assets/${req.params.id}.vtt`, { root: __dirname })
});

module.exports = router;