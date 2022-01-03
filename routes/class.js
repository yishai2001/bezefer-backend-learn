const express = require('express')
const router = express.Router();
const db=require('../DAL');

//gets all the db
router.get('/getAll/:modelName', db.getAll)

//deletes a class
router.delete('/remove/:modelName/:id', db.remove)

//adds a class
router.post('/addClass', db.addClass)

module.exports =router;
