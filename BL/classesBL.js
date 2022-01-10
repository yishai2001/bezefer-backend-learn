const dal=require('../DAL');

async function getAllClasses() {
    return dal.getAll("Classes");
}

async function getClass (classId) {
    return dal.getOne("Classes", classId, "classId");
}

async function removeClass (classId) {
    return dal.remove("Classes", classId, "classId");
}

async function addClass(data) {
    let {classId, name, maxSeats} = data;
    const newClass ={classId, name, maxSeats, currentCapacity:0};
    return dal.add("Classes", newClass);
}

async function getClassesStudents(classId) {
    return dal.getClassesStudents("Classes");
}

module.exports = { 
  getAllClasses,
  removeClass,
  getClass,
  addClass,
  getClassesStudents,
}
