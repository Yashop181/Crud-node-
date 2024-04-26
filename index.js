const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
const StuController = require("./controllers/studentController"); 
mongoose.connect("mongodb://127.0.0.1:27017/house");

app.use(express.static('public'));
app.use(express.static('files'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", StuController.displayHome);
app.get("/insert", StuController.insertData);
app.get("/display", StuController.displayData);
app.post("/datasave", StuController.studataSave);
app.get("/update", StuController.updateStudent);
app.post("/editSave", StuController.editDataSave);
app.get("/recdelete/:id", StuController.recordDelete);
app.get("/recedit/:id", StuController.recordEdit);

app.get("/search/", StuController.searchStuData);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
