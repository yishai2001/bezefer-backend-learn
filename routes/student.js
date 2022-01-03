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

//deletes a student
router.delete('/delete/:id', async function (req, res) {
  const id  = req.params.id;
  try {
    const stu = await models.Students.findOne({where: {id}});
    if (stu.classId !== null){
      const oldClass = await models.Classes.findOne({where: {classId: stu.classId}});
      await models.Classes.update({currentCapacity: oldClass.currentCapacity -1}, {where: {classId:stu.classId}, returning: true, plain: true})
    }
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
      await models.Classes.update({currentCapacity: oldClass.currentCapacity -1}, {where: {classId:stu.classId}, returning: true, plain: true})
    }
    //new class +1
    const newClass = await models.Classes.findOne({where: {classId:classId}});
    await models.Classes.update({currentCapacity:newClass.currentCapacity +1}, {where: {classId:classId}, returning: true, plain: true})
    const ids = await models.Students.update({classId:classId}, {where: {id: id}, returning: true, plain: true})
    return res.json(ids)
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
