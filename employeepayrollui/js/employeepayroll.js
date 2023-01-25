window.addEventListener('DOMContentLoaded', (event) => {
const salary = document.querySelector('#salaryrange');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

const nameText = document.querySelector('#name');
const errorText = document.querySelector('.text-error');
nameText.addEventListener('input' , function() {
    let namePattern = new RegExp(/^[A-Z]{1}[a-zA-z\\s]{2,}/);
    if (namePattern.test(nameText.value)) {
        errorText.textContent = "";
    }
    else if(nameText.value == ""){
        errorText.textContent = "";
    }else 
    errorText.textContent = "Invalid Name";
});
});

const save = () =>{
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return e;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = document.querySelector('#name').value;
    } catch (e) {
        setTextValue('.textError',e);
        throw e;
    }

employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
employeePayrollData.department = getSelectedValues('[name = department]');
employeePayrollData.salary = document.querySelector('#salaryrange').value;
employeePayrollData.note = document.querySelector('#notes').value;
let date = document.querySelector('#day').value + " " + document.querySelector('#month').value + " " + document.querySelector('#year').value;
employeePayrollData.startDate = new Date(date);
alert(employeePayrollData.toString());
return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value);
    });
    return setItems;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
    alert(JSON.stringify(employeePayrollList));
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}