const dal=require('../DAL');
const classModel = require('../models/Classes');

async function getAllClasses() {
    return dal.getAll(classModel);
}

async function getClass (classId) {
    const condition = {where: {classId}}
    return dal.getOne(classModel, condition);
}

async function removeClass (classId) {
    const condition = {where: {classId}}
    return dal.remove(classModel, condition, false);
}

async function addClass(data) {
    let {classId, name, maxSeats} = data;
    const newClass ={classId, name, maxSeats, currentCapacity:0};
    return dal.add(classModel, newClass);
}

async function getClassesStudents(classId) {
    return dal.getClassesStudents(classId);
}

module.exports = { 
  getAllClasses,
  removeClass,
  getClass,
  addClass,
  getClassesStudents,
}
