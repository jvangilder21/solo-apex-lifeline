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

router.put('/:id', (req, res) => {
// PUT route code here

  const {statsData} = req.body;

  const queryText = `
    UPDATE "stats" 
    SET "kills" = $2, "headshots" = $3, "damage" = $4,
    "executions" = $5, "revives" = $6, "kd" = $7
    WHERE "id" = $1 AND "user_id" = $8
    RETURNING *;`;

    const values = [
      req.params.id, 
      statsData[0],
      statsData[1],
      statsData[2],
      statsData[3],
      statsData[4],
      statsData[5],
      req.user.id
    ];
    pool.query(queryText, values)
    .then((result) => {
      if (result.rowCount === 0) {
        res.sendStatus('Stats not updated ', 404)
      } else {
        res.sendStatus(result.rows[0]);
      } 
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus('error updating stats', 500);
    })

})

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "stats" WHERE "id" = $1 
  AND "user_id" = $2;`;

  const values = [req.params.id, req.user.id];

  pool.query(queryText, values)
  .then((result) => {
    if (result.rowCount === 0 ) {
      res.sendStatus('Stats not found', 404);
    } else {
      res.sendStatus('Stats deleted', 201);
    }
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus('Error deleting stat', 500);
  })
})

module.exports = router;
