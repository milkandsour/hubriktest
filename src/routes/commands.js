'use strict';
var express = require('express');
var router = express.Router();
var commands = require('../actions/commands.js');
var colors = require('colors');
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(colors.cyan(
    '[Request] Url:' + req.baseUrl + 'Payload: ' + req.body + ' Method: ' + req.method
  ))
  next();
});

router.get('/', commands.list);
router.post('/', commands.add);
router.get('/:id', commands.get);
router.put('/:id', commands.update);
router.delete('/:id', commands.delete);

module.exports = router;
