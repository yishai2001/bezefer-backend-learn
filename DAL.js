const db = require('./config');
const models = require('./models/');

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
async function getAll(modelName) {
  if (models[modelName] !== undefined)
    return models[modelName].findAll();
};

async function getOne(modelName, id, paramName){
  if (models[modelName] !== undefined){
    let condition ={where:{}};
    condition.where[paramName]=id;
    condition.transaction= t;
    return models[modelName].findAll(condidtion);
  }
}

async function remove (modelName, id, paramName) {
  return db.transaction(async (t) => {
    if (modelName === "Students"){
      const student = await models.Students.findOne({where: {id}, transaction: t });
      models.Classes.decrement({currentCapacity: 1}, { where: { classId: student.classId }, transaction: t})
    }
    if (models[modelName] !== undefined){
      let condition ={where:{}};
      condition.where[paramName]=id;
      condition.transaction= t;
      return await models[modelName].destroy(condition);
    }
})
}

async function add(modelName, newObject) {
  if (models[modelName] !== undefined)
    return await models[modelName].create(newObject, { transaction: t });
}

//update student's class and capacity
async function updateClass(id, classId) {
  return db.transaction( async (t) => {
  const student = await models.Students.findOne({where: {id}, transaction: t});
  //old class -1
  if ( student.classId!==null)
    models.Classes.decrement({currentCapacity: 1}, { where: { classId: student.classId }, transaction: t})
  //new class +1
  models.Classes.increment({currentCapacity: 1}, { where: { classId }, transaction: t})
  await models.Students.update({classId:classId}, {where: {id: id}, returning: true, plain: true, transaction: t});
  return student;
})
}

async function getClassesStudents(classId) {
  return await models.Students.findAll({where: {classId}, transaction: t });
}

//update student's class and capacity
async function updateStudentClassToNull(id) {
  return db.transaction(async (t) => {
    const student = await models.Students.findOne({where: {id}});
    models.Classes.decrement({currentCapacity: 1}, { where: { classId: student.classId }, transaction: t})
    const update = await models.Students.update({classId:null}, {where: {id: id}, returning: true, plain: true});
    return update;
  })
}

module.exports = {db,
  getAll,
  getOne,
  remove,
  add,
  updateClass,
  getClassesStudents,
  updateStudentClassToNull,
}
