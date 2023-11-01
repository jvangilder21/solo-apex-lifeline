const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here

  const queryText = 'SELECT * FROM "challenges" ORDER BY id ASC;';

    pool.query(queryText)
    .then((result) => {
        console.log(`Challenges from the database`, result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`GET ROUTER FAILED`,error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here

  console.log("In POST");
  const queryText = `INSERT INTO "challenges" ("trackedChallenge") VALUES ($1);`;
  pool.query(queryText, [req.body.trackedChallenge])
      .then((result) => {
          console.log(`Added tracked challenge to the database`, req.body.trackedChallenge);
          res.sendStatus(201);
      })
      .catch((error) => {
          console.log(`POST ROUTER FAILED`, error);
          res.sendStatus(500);
      })
  
});

// PUT

router.put('/:id', (req, res) => {
  let {id} = req.params;
  const trackedChallenge = req.body;

  const queryText = `UPDATE "challenges" SET "trackedChallenge" = $1 WHERE "id" = $2;`;

  pool.query(queryText, [req.body.trackedChallenge, id])
  .then((result) => {
      console.log(`Updated tracked challenge with ID from database`, result);
      res.sendStatus(201);
  })
  .catch((error) => {
      console.log(`PUT ROUTER FAILED`, error);
      res.sendStatus(500);
  })
})

// DELETE

router.delete('/:id', (req, res) => {
  let {id} = req.params;
  const queryText = `DELETE FROM "challenges" WHERE "id" = $1;`;
  pool.query(queryText, [id])
  .then((response) => {
      console.log(`removed challenges from database`, response);
      res.sendStatus(201);
  })
  .catch((error) => {
      console.log(`ROUTER DELETE FAILED`, error);
      res.sendStatus(500);
  })
})

module.exports = router;