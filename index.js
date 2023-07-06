const inquirer = require('inquirer')
const connection = require('./config/connection')

function init() {
   inquirer.prompt([
      {
         type: 'list',
         name: 'choices',
         message: 'What would you like to do?',
         choices: ['View All Employees', 'Add employees','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Departments'],
      }


   ]).then(result => {
      if (result.choices === 'view all departments') {
         viewDepartments()
      } else if (result.choices === 'view all roles') {
         viewRoles()
      } else if (result.choices === 'view all employees') {
         viewEmployees()
      } else if (result.choices === 'add a department') {
         addDepartment()
      } else if (result.choices === 'add a role') {
         addRole()
      } else if (result.choices === 'add an employee') {
         addEmployee()
      } else {
         updateRole()
      }

   })
}

function viewEmployees() {
    connection.query('SELECT * FROM employee',(err,res)=>{
        if (err){
            throw err
        }
        console.table(res)
        init()
    })
}

function viewRoles(){
    connection.query('SELECT * FROM role', (err,res) =>{
        if (err){
            throw err
        }
        console.table(res)
        init()
    })
}

function viewRoles(){
    connection.query('SELECT * FROM department', (err,res) =>{
        if (err){
            throw err
        }
        console.table(res)
        init()
    })
}

