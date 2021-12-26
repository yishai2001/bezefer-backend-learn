require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use('./DAL');

const dal=require('./DAL');
const model=require('./models/index');

//app.use('/api/students', require('./modules/routes/student'));
//app.use('/api/classes', require('./modules/routes/classes'));

app.get('/', function (req, res) {
    res.send('home page');
  })

app.get('/why',function(req,res){
    res.send("uthatswhy");
});

const Student = require("./models/Students");
app.get('/Student', async (req, res) => {
    try {
    //   const Student = await dal.Students.findAll()
    //   res.send(Student)
    //   return res.json(Student)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })


app.get("/get", (req, res) =>{
    console.log(model.findAll())
    model.Students.findAll()
    .then((students)=>{
        res.send(students)
    })
  });

  app.get("/getit", (req, res) =>{
    console.log(Student.findAll())
    Student.findAll()
    .then((students)=>{
        res.send(students)
    })
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "dev" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
});



module.exports = app;

