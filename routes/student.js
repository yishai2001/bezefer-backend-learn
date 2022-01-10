const express = require('express')
const router = express.Router();
const bl = require("../BL/studentsBL")

//gets all the db
router.get('/', async (req, res) => {
  try {
    res.json(await bl.getAllStudents());
  }
  catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

//gets by id
router.get('/:id', async (req, res) => {
  const id  = req.params.id; 
  try {
    res.json(await bl.getStudent(id));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

//deletes a class
router.delete('/:id', async (req, res) => {
  const id  = req.params.id;
  try{
  res.json(await bl.removeStudent(id));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

//adds a class
router.post('/addStudent', async (req, res) => {
  const data=req.body;
  try {
    res.json(await bl.addStudent(data));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

//update capacity
router.put('/update/:id/:classId', async (req, res) =>{ 
  const id  = req.params.id;
  const classId  = req.params.classId;
  try {
    res.json(await bl.updateClass(id,classId));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

router.put('/updateStudentClassToNull/:id', async (req, res) => {
  const id  = req.params.id;
  try {
    res.json(await bl.updateStudentClassToNull(id));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

router.get('/getClassesStudents/:classId', async (req, res) => {
  const classId  = req.params.classId;
  try {
    res.json(await bl.getClassesStudents(classId));
  }
  catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

module.exports =router;
