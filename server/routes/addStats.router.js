const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


// GET route
router.get('/', (req, res) => {

    const api_key = process.env.API_KEY;
    const username = req.query.username;

    axios.get(`https://api.mozambiquehe.re/bridge?version=2&platform=PC&player=${username}&auth=${api_key}`)
    .then((response) => {
        res.send(response.data)
        console.log(response.data);
    }).catch((error) => {
        console.log('GET /AddStats failed:', error);
        res.sendStatus(500);
    })
});

module.exports = router;
