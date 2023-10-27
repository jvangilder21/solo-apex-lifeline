const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/', (req, res) => {

    const api_key = process.env.API_KEY;

    axios.get(`https://api.mozambiquehe.re/bridge?version=2&platform=PC&player=MissHazel21&auth=${api_key}`)
    .then((response) => {
        // TODO: Insert into database (stretch)
        res.send(response.data)
        console.log(response.data);
    }).catch((error) => {
        console.log('GET /AddStats failed:', error);
        res.sendStatus(500);
    })
});


module.exports = router;
