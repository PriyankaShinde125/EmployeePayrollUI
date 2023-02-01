let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const salary = document.querySelector('#salaryrange');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    const nameText = document.querySelector('#name');
    const errorText = document.querySelector('.text-error');
    nameText.addEventListener('input', function () {
        try {
            (new EmployeePayrollData()).name = nameText.value;
            errorText.textContent = "";
        } catch (e) {
            errorText.textContent = e;
        }
        if (nameText.value == "") {
            errorText.textContent = "";
        }
    });

    checkForUpdate();

    const date = document.querySelector('#date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input', function() {
        const startDate = new Date(getInputValueById('#day')+" "+
                                            getInputValueById('#month')+" "+
                                            getInputValueById('#year'));
        try {
            (new EmployeePayrollData()).startDate = startDate;
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;

        }
    });
});

const getInputValueById = (id) => {
    return document.querySelector(id).value;
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObj();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        console.log(e);
        alert("Error while storing data ");
        return e;
    }
}
const setEmployeePayrollObj = () =>{
    employeePayrollObj._name = document.querySelector('#name').value;
    employeePayrollObj._profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name = gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name = department]');
    employeePayrollObj._salary = document.querySelector('#salaryrange').value;
    employeePayrollObj._note = document.querySelector('#notes').value;
    let date = document.querySelector('#day').value + " " + document.querySelector('#month').value + " " + document.querySelector('#year').value;
    employeePayrollObj._startDate = new Date(date);
    //console.log(employeePayrollObj.toString());
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    employeePayrollData.id=createNewEmployeeId();
    try {
        employeePayrollData.name = document.querySelector('#name').value;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    console.log(employeePayrollData);
    employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
    employeePayrollData.department = getSelectedValues('[name = department]');
    employeePayrollData.salary = document.querySelector('#salaryrange').value;
    employeePayrollData.note = document.querySelector('#notes').value;
    let date = document.querySelector('#day').value + " " + document.querySelector('#month').value + " " + document.querySelector('#year').value;
    try{
    employeePayrollData.startDate = new Date(date);
    }catch (e) {
        setTextValue('.date-error', e); throw e;
    }
    //alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(tempData => tempData._id==employeePayrollObj._id);
        console.log(empPayrollData);
        if(empPayrollData == undefined){
            employeePayrollList.push(createEmployeePayrollData());
            console.log(employeePayrollList);
        }else{
            let index = employeePayrollList.map(tempData => tempData._id)
                                      .indexOf(empPayrollData._id);
                                      employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }
        console.log(employeePayrollList.size);
    } else {
        employeePayrollList = [createEmployeePayrollData()];
    }
    alert(JSON.stringify(employeePayrollList));
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    console.log(id);
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
     return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate =
            new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue('.date-error', e); throw e;
    }
   // alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const resetForm = () => {
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setTextValue('#name', '');
    setTextValue('#salaryrange', '');
    document.querySelector(".salary-output").textContent = 4000000;
    document.querySelector("#notes").value = '';
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    console.log(date);
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021')
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.setAttribute('value', value);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const checkForUpdate = () => {
    const empPayrollJson = localStorage.getItem('editEmp');
    isUpdate = empPayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(empPayrollJson);
    setForm();
}

const setForm = () => {
    setTextValue('#name', employeePayrollObj._name);
    setTextValue('#salaryrange', employeePayrollObj._salary);
    document.querySelector(".salary-output").textContent = employeePayrollObj._salary;
    document.querySelector("#notes").value = employeePayrollObj._note;
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    console.log(date);
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2])

}

const setValue = (propertyValue, value) => {
    const element = document.querySelector(propertyValue);
    for (var i, j = 0; i = element.options[j]; j++) {
        if (i.value == value) {
            element.selectedIndex = j;
            break;
        }
    }
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}