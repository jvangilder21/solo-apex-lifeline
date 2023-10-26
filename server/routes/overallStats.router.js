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
});

module.exports = router;
