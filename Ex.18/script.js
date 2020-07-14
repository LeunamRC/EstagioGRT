var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();

        const checked = validateNameInTable();

        setTimeout(function(){

            if (!checked) {
                if (selectedRow == null)
                    insertNewRecord(formData);
                else
                    updateRecord(formData);
                resetForm();
            }

        }, 200);

        
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["age"] = document.getElementById("age").value;
    return formData;
}

function validateNameInTable() {
    var table = document.getElementById("employeeList").rows;
    var valida = false;
    if (table.length > 1) {

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
            alert("Nome já Cadastrado !");
            return true;
        }

        return false;
    }
}

function sortTable() {
    var table = document.getElementById("employeeList").rows
    var shouldSwitch, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        for (i = 1; i < (table.length - 1); i++) {
            shouldSwitch = false;
            x = table[i].getElementsByTagName("TD")[1];
            y = table[i + 1].getElementsByTagName("TD")[1];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            table[i].parentNode.insertBefore(table[i + 1], table[i]);
            switching = true;
            switchcount ++;
        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
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
    cell3.innerHTML = `<a onClick="onEdit(this)"><i class="fa fa-pencil" aria-hidden="true"></i></a> 
                       <a onClick="onDelete(this)"><i class="fa fa-trash" aria-hidden="true"></i></a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("age").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("age").value = selectedRow.cells[1].innerHTML ;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.age;
}

function onDelete(td) {
    if (confirm('Deseja apagar esta linha?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
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