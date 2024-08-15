require('dotenv').config()
const { networkInterfaces } = require('os');

const getContainerIpAddress = () => {
    const nets = networkInterfaces();
    let containerIp = 'localhost';
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                containerIp = net.address;
                break;
            }
        }
    }
    return containerIp;
};
const host = getContainerIpAddress();
const port = process.env.PORT || 443;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require("path")

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB")    
})


// enable static path
app.use('/uploads' , express.static(path.join(__dirname, "uploads")))


// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//  enable CORS for all origins
const cors = require('cors')
app.use(cors());


// import routes file
const S_routes = require('./Routes/scrape_routes')
const g_routes = require('./Routes/generate_routes')
const c_routes = require('./Routes/checks_routes')
const content_routes = require('./Routes/content_routes')

app.use('/',S_routes)
app.use('/',g_routes)
app.use('/',c_routes)
app.use('/',content_routes)

app.listen(port , async () => {
    try {
        console.log(`Server is Running And DB Connected http://${host}:${port}`);
    } catch (error) {
        console.log(error);
    }
});