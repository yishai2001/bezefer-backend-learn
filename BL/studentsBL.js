const dal=require('../DAL');

function getAllStudents() {
    return dal.getAll("Students");
}

function getStudent (id) {
    return dal.getOne("Students", id, "id");
}

function removeStudent (id) {
    return dal.remove("Students", id, "id");
}

function addStudent(data) {
    let {id, firstName, lastName, age, profession} = data;
    const newStudent = {id, firstName, lastName, age, profession};
    return dal.add("Students", newStudent);
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
