window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml()
});


const createInnerHtml = () => {

    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>Start Date</th><th>Actions</th>";

    const innerHtml = `${headerHtml}
<tr>
<td>
    <img class="profile" src="../assets/profiles/profile1.jpg" alt="">
</td>
<td>Priyanka Shinde</td>
<td>Female</td>
<td>
    <div class="dept-label">Sales</div>
    <div class="dept-label">Engineer</div>
</td>
<td>&#x20B9; 900000</td>
<td>3 jan 2021</td>
<td>
    <img id="1" onclick="remove(this)" src="../assets/logos/delete.jpg"  alt="delete" >
    <img id="1" onclick="update(this)" src="../assets/logos/edit.jpg" alt="edit" >
</td>
</tr>`;
    document.querySelector('#display').innerHTML = innerHtml;
}