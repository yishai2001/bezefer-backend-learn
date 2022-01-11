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

async function getAll(model) {
  return model.findAll();
};

async function getOne(model, condition){
  return model.findOne(condition);
}

async function remove (model, condition) {
  // if (tHelper !== undefined)
  //   condition.transaction=tHelper;
  //throw new Error("op");
  return await model.destroy(condition);
}

async function add(model, newObject) {
  return await model.create(newObject);
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
  return await models.Students.findAll({where: {classId}});
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

async function decreceCurrentCapacity(classId, needsTransaction){
  let tHelper = db.transaction();
  if (needsTransaction)
    models.Classes.decrement({currentCapacity: 1}, { where: { classId }, transaction: tHelper})
  else
    models.Classes.decrement({currentCapacity: 1}, { where: { classId }})
  return tHelper;
}

async function createTransaction (){
  const t = await db.transaction();
  return t;
}

async function increceCurrentCapacity(classId, t){
  if (t!==undefined)
    models.Classes.increment({currentCapacity: 1}, { where: { classId }, transaction: t})
  else
    models.Classes.increment({currentCapacity: 1}, { where: { classId }})
}

module.exports = {db,
  getAll,
  getOne,
  remove,
  add,
  updateClass,
  getClassesStudents,
  updateStudentClassToNull,
  decreceCurrentCapacity,
  increceCurrentCapacity,
  createTransaction
}
