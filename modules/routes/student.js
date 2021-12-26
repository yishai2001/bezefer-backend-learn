const express = require('express')

const { sequelize, Students } = require('../../models/Students')

app.post('/students', async (req, res) => {
  const {  firstName, lastName, age, classId, profession } = req.body

  try {
    const Student = await Students.create({ firstName, lastName, age, classId, profession })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/Student', async (req, res) => {
  try {
    const users = await Student.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
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
