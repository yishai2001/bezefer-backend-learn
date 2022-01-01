const express = require('express')
const router = express.Router();
const models = require('../models/')
const dal=require('../DAL');

//get all students
router.get('/allStudents', async function (req, res) {
  try {
    const stu = await models.Students.findAll()

    return res.json(stu)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

//get all students' id
router.get('/allStudentsId', async function (req, res) {
  try {
    const ids = await models.Students.findAll({attributes: ['id']})

    return res.json(ids)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

//deletes a student
router.delete('/delete/:id', async function (req, res) {
  const id  = req.params.id;
  try {
    const ids = await models.Students.destroy({where: {id}})

    return res.json(ids)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

//update capacity
router.put('/update/:id/:classId', async function (req, res) {
  const id  = req.params.id;
  const classId  = req.params.classId;
  try {
    const stu = await models.Students.findOne({where: {id}});
    //old class -1
    if (stu.classId !== null){
      const oldClass = await models.Classes.findOne({where: {classId: stu.classId}});
      oldClass.currentCapacity--;
      await models.Classes.update(oldClass, {where: {classId:stu.classId}})
    }
    //new class +1
    const newClass = await models.Classes.findOne({where: {classId:classId}});
    newClass.currentCapacity++;
    await models.Classes.update(newClass, {where: {classId:classId}})
    stu.classId = classId;
    const ids = await models.Students.update(stu, {where: {id}})
    return res.json(stu)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

router.route('/addStudent').post(async function(req, res) {
  const data=req.body;
  let {id, firstName, lastName, age, profession} = data;

  try {
    const Student = await models.Students.create({id, firstName, lastName, age, profession})

    return res.json(Student)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

module.exports =router;
