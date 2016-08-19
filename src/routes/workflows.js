'use strict';
var express = require('express');
var router = express.Router();
var workflows = require('../actions/workflows.js')
var colors = require('colors');

router.use(function timeLog(req, res, next) {
  console.log(colors.cyan(
    '[Request] Url:' + req.baseUrl + ' Method: ' + req.method
  ))
  next();
});

router.get('/', workflows.list);
router.post('/', workflows.add);
router.delete('/:id?', workflows.delete);

module.exports = router;
