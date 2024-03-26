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
    console.log("Connected!");
});


const questions = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?:",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
]

function viewAllDepartments(){
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
    })
}

function viewAllRoles(){
    connection.query("SELECT * FROM role", function (err, data) {
        console.table(data);
    })
}

function viewAllEmployees(){
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
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
            })
        })
    })
}



inquirer.prompt(questions).then((responses)=>{
    console.log(responses);
    if (responses.choice === 'view all departments'){
        viewAllDepartments();
    }
    else if(responses.choice === 'view all roles'){
        viewAllRoles();
    }
    else if(responses.choice === 'view all employees'){
        viewAllEmployees();
    }
    else if(responses.choice === 'add a department'){
        addDepartment();
    }
    else if(responses.choice === 'add a role'){
        addRole();
    }
    else if(responses.choice === 'add an employee'){
        
    }
    else if(responses.choice === 'update an employee role'){
        
    }
});
