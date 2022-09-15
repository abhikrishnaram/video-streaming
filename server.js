const express = require('express')
const app = express()
const videoRoutes = require('./routes')
const port = 8000
const path = require('path')
const cors = require('cors')

app.use(cors({origin: '*'}))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/client.html'));
});

app.use('/videos', videoRoutes)

app.listen(port, () => {
  console.log(`App - localhost:${port}`)
})
