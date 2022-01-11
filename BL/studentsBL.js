const dal=require('../DAL');
const studentModel = require('../models/Students');

function getAllStudents() {
    return dal.getAll(studentModel);
}

function getStudent (id) {
    const condition = {where: {id}}
    return dal.getOne(studentModel, condition);
}

async function removeStudent (id) {
    const t = dal.createTransaction();
    const condition = {where: {id}, transaction: t}
    const student = await dal.getOne(studentModel,condition);
    if (student.classId !== undefined)
        return dal.remove(studentModel, condition);
    else
        return dal.remove(studentModel, condition);
}

function addStudent(data) {
    let {id, firstName, lastName, age, profession} = data;
    const newStudent = {id, firstName, lastName, age, profession};
    return dal.add(studentModel, newStudent);
}

function updateClass(id, classId) {
    return dal.updateClass(id, classId);
}

function getClassesStudents(classId) {
    return dal.getClassesStudents(classId);
}

function updateStudentClassToNull(studentId) {
    return dal.updateStudentClassToNull(studentId);
}

module.exports = {
  getAllStudents,
  removeStudent,
  getStudent,
  addStudent,
  updateClass,
  getClassesStudents,
  updateStudentClassToNull
}
