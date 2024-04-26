const StuModel = require("../models/studentModel");

// Render the home page
const displayHome = (req, res) => {
    res.render("home");
};

// Render the form to insert student data
const insertData = (req, res) => {
    res.render('insert');
};

// Render the page to display student data
const displayData = (req, res) => {
    StuModel.find().then((data)=>{
        res.render("display",{myData:data});
    })
};

// Save student data to the database
const studataSave = (req, res) => {
    // Extract student data from the request body
    let Sturollno = req.body.rno;
    let Stufees = req.body.fs;
    let Stucity = req.body.ct;
    let Stuname = req.body.nm;
    
    // Create a new instance of StuModel with the extracted data
    const student = new StuModel({
        name: Stuname,
        rollno: Sturollno,
        city: Stucity,
        fees: Stufees
    });
    
    // Save the student data to the database
    student.save()
        StuModel.find().then((data)=>{
            res.render("display",{myData:data});
        })
};

const updateStudent = async (req, res) => {
    const data = await StuModel.find();
    res.render("update",{myData:data});

};


const recordDelete =(req,res)=>{
    const myid = req.params.id;
    StuModel.findByIdAndDelete(myid).then((data1)=>{
        StuModel.find().then((data1)=>{
            res.redirect("/update");
        })
    })  
};
const recordEdit = async (req, res) => {
    const myid = req.params.id;
    StuModel.findById(myid).then((data) => {
        console.log(data);
        res.render("editDisplay", { myData: data }); // Move res.render inside the .then() block
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data"); // Handle error if findById fails
    });
};

const editDataSave=async(req,res)=>{
     let id = req.body.id;
     let rno = req.body.rno;
     let nm = req.body.nm;
     let ct = req.body.ct;
     let fs = req.body.fs;
     StuModel.findByIdAndUpdate(id,{rollno:rno, name:nm, city:ct, fees:fs}).then(()=>{
        res.redirect("/update");
     })
}



const searchStuData = (req, res) => {
    const studentId = req.query.id; 

    // Search for the student data in the database based on the student ID
    StuModel.find({ name: studentId })
        .then((searchResults) => {
            // Render the search results in the 'search' view (search.ejs) template
            res.render("search", { myData: searchResults });
        })
        .catch((err) => {
            console.error("Error searching for student data:", err);
            res.status(500).send("Error searching for student data");
        });
};


module.exports = {
    displayHome,
    insertData,
    displayData,
    studataSave,
    updateStudent,
    recordDelete,
    recordEdit,
    editDataSave,
    searchStuData
};
