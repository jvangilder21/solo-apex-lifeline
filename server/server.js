const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');


const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

//OVERALL STATS ROUTER
const overallStatsRouter = require('./routes/overallStats.router');
//ADD STATS ROUTER
const addStatsRouter = require('./routes/addStats.router');
// CHALLENGES TRACKED ROUTER
const challengesTrackedRouter = require('./routes/challengesTracked.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/OverallStats', overallStatsRouter);
app.use('/api/AddStats', addStatsRouter);
app.use('/api/challengesTracked', challengesTrackedRouter);

// API GET ROUTE
const api_key = process.env.API_KEY;

app.get('/api/AddStats', (req, res) => {
  // axios.get(`https://api.mozambiquehe.re/bridge?version=2&platform=PC&player=MissHazel21&auth=${api_key}`)
  axios.get(`https://api.mozambiquehe.re/bridge?version=2&platform=PC&player=${username}&auth=${api_key}`)

  .then((response) => {
    // TODO: Insert into database (stretch)
      res.send(response.data)
      console.log(response.data);
  }).catch((error) => {
      console.log('GET /info fail server:', error);
      res.sendStatus(500);
  })
})

// app.post('/api/AddStats', (req, res) => {
//   console.log(request);
//   // const statsData = req.params;
//   axios.get(`https://api.mozambiquehe.re/bridge?version=2&platform=PC&player=MissHazel21&auth=${api_key}`)
//   .then((response) => {
//       res.send(response.data)
//       console.log(response.data);
//   }).catch((error) => {
//       console.log('GET /info fail server:', error);
//       res.sendStatus(500);
//   })
// })



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
