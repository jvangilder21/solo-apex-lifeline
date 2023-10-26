const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  // GET route code here
  console.log('/overallStats GET route');
    const userId = req.user.id;

    // Query to retreive stats ordered by display_order
    const queryText = `
    SELECT id, kills, headshots, damage, executions, revives, kd 
    FROM "stats" 
    WHERE "user_id" = $1
    ORDER BY display_order;`;
    pool.query(queryText, [userId])
    .then((result) => {
      console.log('Database query successful');
      console.log('Result:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here

  const {statsData} = req.body;
  console.log(req.body);

  const queryText = `
    INSERT INTO "stats" ("user_id", "kills", "headshots", 
    "damage", "executions", "revives", "kd")
    VALUES ( $1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`;

    const values = [
      req.user.id, 
      statsData[0],
      statsData[1],
      statsData[2],
      statsData[3],
      statsData[4],
      statsData[5]
    ];
    pool.query(queryText, values)
    .then((result) => {
      res.sendStatus(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
