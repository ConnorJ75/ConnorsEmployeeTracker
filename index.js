const { default: inquirer } = require("inquirer");

const questions = [
    {
        type: "list",
        name: "shape",
        message: "What shape do you want your logo to be?(use arrow keys):",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'and update an employee role']
    }
]

inquirer.prompt(questions).then((responses)=>{
    console.log(responses);
});
