window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollData = getDataFromLocalStorage();
    document.querySelector('.emp-count').textContent = empPayrollData.length;
    createInnerHtml()
});

const getDataFromLocalStorage = () => {
    return localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
}

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    for (const empData of empPayrollData) {
        innerHtml = `${innerHtml}
     <tr>
    <td>
        <img class="profile" src="${empData._profilePic}" alt="">
    </td>
    <td>${empData._name}</td>
    <td>${empData._gender}</td>
    <td>${getDeptHtml(empData._department)}</td>
    <td>&#x20B9; ${empData._salary}</td>
    <td>${empData._startDate}</td>
    <td>
        <img id="1" onclick="remove(${empData._id})" src="../assets/logos/delete.jpg" alt="delete" >
        <img id="1" onclick="update(${empData._id})" src="../assets/logos/edit.jpg" alt="edit" >
    </td>
    </tr>`
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        console.log(dept);
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    console.log(deptHtml);
    return deptHtml;
}

const createEmployeePayrollJson = () => {
    let empPayrollListLocal = [
        {
            _id: new Date().getTime(),
            _department: ["sales", "finance", "engineers"],
            _gender: "male",
            _name: "Rudransh Uphade",
            _note: "tttttt",
            _profilePic: "../assets/profiles/profile2.jpg",
            _salary: "4768100",
            _startDate: "20 Dec 2022"
        },
        {
            _id: new Date().getTime(),
            _department: ["engineers"],
            _gender: "female",
            _name: "Priyanka shinde",
            _note: "test",
            _profilePic: "../assets/profiles/profile1.jpg",
            _salary: "376500",
            _startDate: "2 Jun 2022"
        },
        {
            _id: new Date().getTime(),
            _department: ["sales", "finance"],
            _gender: "female",
            _name: "Priya uphade",
            _note: "tywr",
            _profilePic: "../assets/profiles/profile1.jpg",
            _salary: "2765100",
            _startDate: "15 Oct 2021"
        }
    ];
    return empPayrollListLocal;
}