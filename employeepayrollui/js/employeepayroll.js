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
