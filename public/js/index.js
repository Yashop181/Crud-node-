function validation(){
    let rollno = document.f1.rno.value;
    if(rollno == "") {
        alert("Please enter a value.");
        document.f1.rno.focus();
        return false;
    }

    return true; 
}

