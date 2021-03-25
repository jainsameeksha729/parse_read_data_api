const express = require('express');
const search = require("./search.route");
const router = express.Router();


router.get('/status', (req, res) => res.send('OK'));

router.use("/clinical", search);

module.exports = router;
