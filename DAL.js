//const sequelize = require('sequelize');
const db = require('./config');
const models = require('./models/')

db.authenticate().then(() => {
  console.log('Connection established successfully.');
  }).catch(err => {
  console.error('Unable to connect to the database:', err);
  db.close();
});

Object.keys(db.models).forEach(function(modelName) {
  if ("associate" in db.models[modelName]) {
    db.models[modelName].associate();
  }
});

db.sync();

// gets the model name and return its content
async function getAll(req, res) {
  const modelName  = req.params.modelName;
  try {
    if (modelName === "Classes" || modelName === "Students"){
    const allData = await models[modelName].findAll();
    return res.json(allData);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

// gets the model name and an id. deletes the data by the id
async function remove (req, res) {
  const modelName  = req.params.modelName;
  const id  = req.params.id;
  try {
    let param;
    if (modelName === "Classes")
      param = await models.Classes.destroy({where: {classId: id}});
    if (modelName === "Students"){
      const student = await models.Students.findOne({where: {id}});
      //update currentCapacity
      if (student.classId !== null){
        const oldClass = await models.Classes.findOne({where: {classId: student.classId}});
        await models.Classes.update({currentCapacity: oldClass.currentCapacity -1}, {where: {classId:student.classId}, returning: true, plain: true});
      }
      param = await models.Students.destroy({where: {id}});
    }
    return res.json(param);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

//adds a class
async function addClass(req, res) {
  const data=req.body;
  let {classId, name, maxSeats} = data;

  try {
    const cla = await models.Classes.create({classId, name, maxSeats, currentCapacity:0});

    return res.json(cla);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

//adss a student
async function addStudent(req, res) {
  const data=req.body;
  let {id, firstName, lastName, age, profession} = data;

  try {
    const Student = await models.Students.create({id, firstName, lastName, age, profession});

    return res.json(Student);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

//update student's class and capacity
async function updateClass(req, res) {
  const id  = req.params.id;
  const classId  = req.params.classId;
  try {
    const stu = await models.Students.findOne({where: {id}});
    //old class -1
    if (stu.classId !== null){
      const oldClass = await models.Classes.findOne({where: {classId: stu.classId}});
      await models.Classes.update({currentCapacity: oldClass.currentCapacity -1}, {where: {classId:stu.classId}, returning: true, plain: true});
    }
    //new class +1
    const newClass = await models.Classes.findOne({where: {classId:classId}});
    await models.Classes.update({currentCapacity:newClass.currentCapacity +1}, {where: {classId:classId}, returning: true, plain: true});
    const ids = await models.Students.update({classId:classId}, {where: {id: id}, returning: true, plain: true});
    return res.json(ids);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

// gets the model name and return its content
async function getClassesStudents(req, res) {
  const classId  = req.params.classId;
  try {
    const allData = await models.Students.findAll({
      where: {
        classId
      }
    });
    return res.json(allData);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

//update student's class and capacity
async function updateStudentClassToNull(req, res) {
  const id  = req.params.id;
  try {
    const stu = await models.Students.findOne({where: {id}});
    const oldClass = await models.Classes.findOne({where: {classId: stu.classId}});
    await models.Classes.update({currentCapacity: oldClass.currentCapacity -1}, {where: {classId:stu.classId}, returning: true, plain: true});
    const upd = await models.Students.update({classId:null}, {where: {id: id}, returning: true, plain: true});
    return res.json(upd);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = {db,
  getAll,
  remove,
  addClass,
  addStudent,
  updateClass,
  getClassesStudents,
  updateStudentClassToNull
}
