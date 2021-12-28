const express = require('express')
const router = express.Router();
const Students = require('../models/Students')
const dal=require('../DAL');
const db=dal.db;

//get all students
router.get('/allStudents', async (req, res) => {
  try {
    const stu = await Students.findAll()

    return res.json(stu)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

router.post('/addStudent', async (req, res) => {
  //const {  firstName, lastName, age, classId, profession } = req.body
  const data={ id:"123456789", firstName:"ליבי", lastName:"חביבי", age:20, classId:3, profession:"ספורט", image:null};
  let {id, firstName, lastName, age, classId, profession, image} = data;

  try {
    const Student = await Students.create({id, firstName, lastName, age, classId, profession, image})

    return res.json(Student)
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
