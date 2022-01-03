const express = require('express')
const router = express.Router();
const db=require('../DAL');

//gets all the db
router.get('/getAll/:modelName', db.getAll);

//deletes a class
router.delete('/remove/:modelName/:id', db.remove);

//adds a class
router.post('/addStudent', db.addStudent);

//update capacity
router.put('/update/:id/:classId', db.updateClass);

//update capacity
router.get('/getClassesStudents/:classId', db.getClassesStudents);

//update capacity
router.put('/updateStudentClassToNull/:id', db.updateStudentClassToNull);

module.exports =router;
