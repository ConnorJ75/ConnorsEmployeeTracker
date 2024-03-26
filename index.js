const inquirer = require("inquirer");
const mysql = require('mysql2');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password123",
    database: "employees_db"
});
connection.connect(function (err) {
    if (err) throw err;
});

function viewAllDepartments(){
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        displayChoices();
    })
}

function viewAllRoles(){
    connection.query("SELECT * FROM role", function (err, data) {
        console.table(data);
        displayChoices();
    })
}

function viewAllEmployees(){
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        displayChoices();
    })
}

function addDepartment(){
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "Please enter the department you would like to add: "
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (department_name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("The new department has been added.");
            connection.query("SELECT * FROM department", function (err, data) {
                console.table(data);
                displayChoices();
            })
        })
    })
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "Please enter the role you would like to add: "
        }, 
        {
            type: "input",
            name: "salary",
            message: "Please enter the salary of the role: "
        },
        {
            type: "input",
            name: "dept_id",
            message: "Please enter the department id of the role: "
        }
    ]).then(function(res) {
        connection.query('INSERT INTO role (title, salary, dept_id) VALUES (?,?,?)', [res.role, res.salary, res.dept_id], function(err, data) {
            if (err) throw err;
            console.table("The new role has been added.");
            connection.query("SELECT * FROM role", function (err, data) {
                console.table(data);
                displayChoices();
            })
        })
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Please enter the employee's first name: "
        },
        {
            type: "input",
            name: "last",
            message: "Please enter the employee's last name: "
        },
        {
            type: "input",
            name: "role_id",
            message: "Please enter the employee's role id: "
        },
        {
            type: "input",
            name: "manager_id",
            message: "Please enter the employee's manager's id: "
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [res.first, res.last, res.role_id, res.manager_id], function(err, data) {
            if (err) throw err;
            console.table("The new employee has been added.");
            connection.query("SELECT * FROM employee", function (err, data) {
                console.table(data);
                displayChoices();
            })
        })
    })
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            message: "Please enter the employee's id you would like to switch the role of:",
            type: "input",
            name: "employee_id"
        }, {
            message: "Please enter the new role id you would like to assign to this employee:",
            type: "input",
            name: "new_role_id"
        }
    ])
    .then(function(response) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.new_role_id, response.employee_id], function (err, data) 
        {
            if (err) throw err;
            console.log(`Role has officially been switched for employee id: ${response.employee_id}`);
            connection.query("SELECT * FROM employee", function (err, data) {
                console.table(data);
                displayChoices();
            })
        })
    })
}

const questions = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?:",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
    }
]


async function displayChoices(){
    console.log("\n");
    inquirer.prompt(questions)
    .then((responses)=>{
        let c = responses.choice;
        if (c === 'view all departments'){
            viewAllDepartments();
        }
        else if(c === 'view all roles'){
            viewAllRoles();
        }
        else if(c === 'view all employees'){
            viewAllEmployees();
        }
        else if(c === 'add a department'){
            addDepartment();
        }
        else if(c === 'add a role'){
            addRole();
        }
        else if(c === 'add an employee'){
            addEmployee();
        }
        else if(c === 'update an employee role'){
            updateEmployeeRole();
        }
        else{
            console.log("Goodbye.");
            return;
        }
    });
}

displayChoices();



