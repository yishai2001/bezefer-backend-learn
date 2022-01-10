const express = require('express')
const router = express.Router();
const bl= require("../BL/classesBL")

//gets all the db
router.get('/', async (req, res) => {
  try {
    res.json(await bl.getAllClasses());
  } catch( err ) {
      console.error(err.message);
      res.status(500).json({message:err.message});
  }
});

//gets by id
router.get('/:id', async (req, res) => {
  const id  = req.params.id; 
  try {
    res.json(await bl.getClass(id));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
}
});

//deletes a class
router.delete('/:id', async (req, res) => {
  const id  = req.params.id; 
  try {
      res.json(await bl.removeClass(id));
  } catch( err ) {
      console.error(err.message);
      res.status(500).json({message:err.message});
  }
});

//adds a class
router.post('/addClass', async (req, res) => {
  const data=req.body;
  try {
    res.json(await bl.addClass(data));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

router.get('/getClassesStudents/:classId', async (req, res) => {
  const classId  = req.params.classId;
  try {
    res.json(await bl.getClassesStudents(classId));
  } catch( err ) {
    console.error(err.message);
    res.status(500).json({message:err.message});
  }
});

module.exports =router;
