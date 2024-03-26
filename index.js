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

inquirer.prompt(questions).then((responses)=>{
    console.log(responses);
    if (responses.choice === 'view all departments'){
        
    }
    else if(responses.choice === 'view all roles'){
        
    }
    else if(responses.choice === 'view all employees'){
        
    }
    else if(responses.choice === 'add a department'){
        
    }
    else if(responses.choice === 'add a role'){
        
    }
    else if(responses.choice === 'add an employee'){
        
    }
    else if(responses.choice === 'update an employee role'){
        
    }
});
