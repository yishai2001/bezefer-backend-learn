const express = require('express')
const router = express.Router();
const Classes = require('../models/Classes')
const dal=require('../DAL');
//const db=dal.db;

//get all class
router.get('/allClasses', async (req, res) => {
  try {
    const classList = await Classes.findAll()

    return res.json(classList)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

router.post('/addStudent', async (req, res) => {
  //const {  firstName, lastName, age, classId, profession } = req.body
  const id=666555, firstName="ליבי", lastName="חביבי", age=20, classId=3, profession="ספורט";

  try {
    const Student = await Classes.create({id, firstName, lastName, age, classId, profession })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


// app.get('/users/:uuid', async (req, res) => {
//   const uuid = req.params.uuid
//   try {
//     const user = await User.findOne({
//       where: { uuid },
//       include: 'posts',
//     })

//     return res.json(user)
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({ error: 'Something went wrong' })
//   }
// })

module.exports =router;
