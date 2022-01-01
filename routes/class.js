const express = require('express')
const router = express.Router();
const models = require('../models/')
const dal=require('../DAL');

//get all classes
router.get('/allClasses', async function (req, res) {
  try {
    const cla = await models.Classes.findAll()

    return res.json(cla)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

//deletes a class
router.delete('/delete/:id', async function (req, res) {
  const id  = req.params.id;
  try {
    const ids = await models.Classes.destroy({where: {classId: id}})

    return res.json(ids)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

//update capacity
router.put('/update/:id/:update', async function (req, res) {
  const id  = req.params.id;
  const update  = req.params.update;
  try {
    const cla = await models.Classes.findOne({where: {classId: id}});
    cla.currentCapacity += +update;
    const ids = await models.Classes.update(cla, {where: {classId: id}})

    return res.json(ids)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

//adds a class
router.post('/addClass', async function(req, res) {
  const data=req.body;
  let {classId, name, maxSeats} = data;

  try {
    const cla = await models.Classes.create({classId, name, maxSeats, currentCapacity:0})

    return res.json(cla)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

module.exports =router;
