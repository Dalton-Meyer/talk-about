const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
	console.log("ROUTE: GET /api/topic/");
	
	const queryText = `SELECT * FROM topic;`
	const queryValues = [];
	pool.query(queryText, queryValues)
		.then((result) => {
			res.status(200).send(result.rows);
		})
		.catch((error) => {
			res.sendStatus(500);
		})
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;