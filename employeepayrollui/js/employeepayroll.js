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
    try {
        (new EmployeePayrollData()).name = nameText.value;
        errorText.textContent = "";
    } catch (e) {
        errorText.textContent = e;
    }
    if(nameText.value == ""){
        errorText.textContent = "";
    }
});
});

const save = () =>{
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
        alert("Data added successfully");
    } catch (e) {
        alert("Error while storing data ");
        return e;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = document.querySelector('#name').value;
    } catch (e) {
        setTextValue('.text-error',e);
        throw e;
    }
employeePayrollData.id = new Date().getTime();
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
       console.log(employeePayrollList.size);
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
    alert(JSON.stringify(employeePayrollList));
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2021');
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.setAttribute('value',value);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}