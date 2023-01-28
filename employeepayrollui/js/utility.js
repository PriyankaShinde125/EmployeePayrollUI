const stringifyDate =(date)=>{
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const empDate = !date ? "undefined" :
        new Date(Date.parse(date)).toLocaleDateString("en-GB",options);
        return empDate;
}

const update = (id) => { 
    let emp = empPayrollData.find(tempData => tempData._id==id);
    if(!emp) return;
    localStorage.setItem("editEmp", JSON.stringify(emp));
    window.location.replace(site_properties.add_payroll_data);
}