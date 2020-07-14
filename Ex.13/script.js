var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["age"] = document.getElementById("age").value;
    return formData;
}

function validanome(){
    var table = document.getElementById("employeeList").rows;
    var valida;
    if (table.length > 1){
        for (i = 1; i < (table.length - 1); i++) {
            valida = false;
            x = table[i].getElementsByTagName("TD")[0];
            y = table[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() == y.innerHTML.toLowerCase()) {
                valida = true;
                break;
            }
        }
        if (valida) {
            alert("Nome ja Cadastrado");
        }
    }
}

function sorttable(){
    var table = document.getElementById("employeeList").rows
    var shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        if (table.length > 1){
            for (i = 1; i < (table.length - 1); i++) {
                shouldSwitch = false;
                x = table[i].getElementsByTagName("TD")[1];
                y = table[i + 1].getElementsByTagName("TD")[1];
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                table[i].parentNode.insertBefore(table[i + 1], table[i]);
                switching = true;
            }
        }
    }
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.age;
    cell3 = newRow.insertCell(2);
    validanome();
    sorttable();
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("age").value = "";
    selectedRow = null;
}


function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}