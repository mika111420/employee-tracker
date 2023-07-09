const inquirer = require('inquirer')
const connection = require('./config/connection')

async function init() {
   try {
      const {choices} = await inquirer.prompt([
        {
          type: 'list',
          name: 'choices',
          message: 'What would you like to do?',
          choices: [
            'View All Employees',
            'Add Employees',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Departments'
          ],
        }
      ]);
  
      switch (choices) {
        case 'View All Employees':
          await viewEmployees();
          break;
        case 'Add Employees':
          await addEmployee();
          break;
        case 'Update Employee Role':
          await updateEmployeeRole();
          break;
        case 'View All Roles':
          await viewRoles();
          break;
        case 'Add Role':
          await addRole();
          break;
        case 'View All Departments':
          await viewDepartments();
          break;
        case 'Add Departments':
          await addDepartment();
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function viewRoles() {
   try {
     const query = 'SELECT * FROM role';
     const [rows] = await connection.promise().query(query);
     console.table(rows);
     await init();
   } catch (error) {
     console.error(error);
   }
 }
 
 async function viewDepartments() {
   try {
     const query = 'SELECT * FROM department';
     const [rows] = await connection.promise().query(query);
     console.table(rows);
     await init();
   } catch (error) {
     console.error(error);
   }
 }
 
 async function addDepartment() {
   try {
     const {department} = await inquirer.prompt([
       {
         type: 'text',
         name: 'department',
         message: 'What is the name of the department?',
       }
     ]);
 
     const query = 'INSERT INTO department(name) VALUES (?)';
     const result = await connection.promise().query(query, [department]);
     console.log(`Added ${department} to the database`);
     await init();
   } catch (error) {
     console.error(error);
   }
 }
 
 async function addRole() {
   try {
     const departmentsQuery = 'SELECT * FROM department';
     const [departments] = await connection.promise().query(departmentsQuery);
 
     const result = await inquirer.prompt([
       {
         type: 'text',
         name: 'role',
         message: 'What is the name of the role?',
       },
       {
         type: 'number',
         name: 'salary',
         message: 'What is the salary of the role?',
       },
       {
         type: 'list',
         name: 'department',
         message: 'What department is this role assigned to?',
         choices: departments.map(department => `${department.name} (department id: ${department.id})`),
       },
     ]);
 
     const departmentId = result.department.split('id: ')[1].replace(')', '');
     const query = 'INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)';
     const [insertResult] = await connection.promise().query(query, [result.role, result.salary, departmentId]);
     console.log(`Added ${result.role} to the database`);
     await init();
   } catch (error) {
     console.error(error);
   }
 }


 async function addEmployee() {
   try {
     const res = await inquirer.prompt([
       {
         type: 'text',
         name: 'firstName',
         message: "What is the employee's first name?"
       },
       {
         type: 'text',
         name: 'lastName',
         message: "What is the employee's last name?"
       }
     ]);
 
     const firstName = res.firstName;
     const lastName = res.lastName;
 
     const [roleRows] = await connection.promise().query('SELECT * FROM role');
     const choices = roleRows.map(({ id, title }) => {
       return { name: `${title} (role id: ${id})` };
     });
 
     const roleRes = await inquirer.prompt([
       {
         type: 'list',
         name: 'role',
         message: 'Select a role for the employee',
         choices: choices
       }
     ]);
     const roleId = roleRes.role.split('id: ')[1].replace(')', '');

     await connection.promise().query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);

    console.log(`Added ${firstName} ${lastName} to the database`);
    await init();
  } catch (error) {
    console.error(error);
  }
}

async function updateRole() {
  try {
    const [res] = await connection.promise().query('SELECT title, first_name, last_name, employee.id, role.id FROM role, employee WHERE role.id = role_id');

    const employeeRes = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: "What is the employee's name?",
        choices: res.map(employee => `${employee.first_name} ${employee.last_name} (employee id: ${employee.id})`)
      },
      {
        type: 'list',
        name: 'role',
        message: 'What role would you like to assign to the selected employee?',
        choices: res.map(role => `${role.title} (role id: ${role.id})`)
      }
    ]);

    const employeeId = employeeRes.employee.split('id: ')[1].replace(')', '');
    const roleId = employeeRes.role.split('id: ')[1].replace(')', '');

    await connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);

    console.log(`Updated ${employeeRes.employee} role to ${employeeRes.role}`);
    await init();
  } catch (error) {
    console.error(error);
  }
}


init()
