const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

// connect to datbase
const employeeTracker_db = mysql.createConnection(
    {
        host:'127.0.0.1',
        user:'root',
        database:'employeeTracker_db',
        password: '',
    },
    console.log('Connected to databaase')
);

//options 
const question = () => {
    inquirer
    .prompt ([
    {
        type: 'list',
        message: " Select an option from the menu",
        name: 'menuOptions',
        choices: [
            "View all Employees",
            "View all Department",
            "View all Roles",
            "Add a Department",
            "Add a Role",
            "Add Employees",
            "Remove Employee",
            "Update Employee Role",
        ],
    },
  ])
  .then ((response) => {
    switch (response.choices) {
        case "View all departments":
            viewAllDepartments ();
            break;
        case "view all roles":
            viewAllRoles ();
            break;
        case "View all employees":
            viewAllEmployees ();
            break;
        case "Add a department":
            addDepartment ();
            break;
        case "Add a role":
            addRole ();
            break;
        case "Add a Employee":
            addEmployee();
            break;
        case "Update employee":
            updateEmployee();
            break;
        case "Remove Employee":
            RemoveEmployee();
            break;
    }
 })
}
const viewAllDepartments = () => {
    connectDB.query('SELECT * FROM department', (err,res) => {
        if (err) throw err;
        console.table
        (res); //shows department table from db ie employee_db
        question();
    });
};

const viewAllEmployees = () => {
    connectDB.query('SELECT * FROM employee', (err,res) => {
        if (err) throw err;
        console.table(res); //shows all employees from table employee_db
        question();
    });
};

const viewAllRoles = () => {
    connectDB.query('SELECT * FROM role', (err,res) => {
        if (err) throw err;
        console.table(res); //shows all roles table from db ie employee_db
        question();
    });
};

const addDepartment = () => {
    inquirer
    .prompt ([
        {
            type: "input",
            message: "Please input the department that you want to add :",
            name: 'newDepartment',
        },
    ])
    .then((response) => {
        connectDB.query(`INSERT INTO department (name)
        VALUES('${response.newDepartment}')`,
        (err,  res) => {
            if(err) throw err;
            console.log('New department created!');
            question();
        });
    });
}

const addRole = () => {
    const query = "SELECT * FROM departments";
    connectDB.query(query, (err,res) => {
        if (err) throw err;
    })
    inquirer 
    .prompt([
        {
            type: 'input',
            message: 'What role would you like to add?',
            name: 'newRole',
        },
        {
            type: 'input',
            message: ' What is the salary?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'What is the department that they belong?',
            name: 'deptList',
            choices: res.map(
                (deptList) => deptList.department_name
            ),
        },
    ])
    .then((response) => {
        const deptList = res.find(
            (deptList) => deptList.name === response.deptList
        );
        connectDB.query(`INSERT INTO role (title, salary, department_id)
        VALUES('${response.newRole}', '${response.salary}', '${response.deptList}')`,
        (err, res) => {
            if (err) throw err;
            console.log('New role created!');
            question();
        });
    });
}

const addEmployee = () => {
    // retrieve roles form the database
    connectDB.query('SELECT id, title FROM roles', (err, res) => {
        if (err) throw err;  
         
    const roles = results.map(({id, titile}) => ({
        name: titile,
        value: id,
    }));

    //retrieve employees from the database to update as managers
   connectDB.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',(err,res) => {
    if(err) throw err;
   
    const managers = results.map(({ id, name}) => ({
       name,
       value: id,
    }));

    })
    inquirer 
    .prompt ([
        {
        type: 'input',
        message: 'Employee first name',
        name: 'firstName',
        },
        {
            type: 'input',
            message: 'Employee last name',
            name: 'lastName',
        },
        {
            type: 'list',
            message: 'What role do they belong?',
            name: 'roleList',
            choices: roles,
        },
        {
            type: 'list',
            message: 'Select employee manager:',
            name:"managerId",
            choices: [
                ...managers,
            ],
        },

    ])
    .then ((response) => {
        const sql = 
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ()";
        const values = [
            response.firstName,
            response.lastName,
            response.roleId,
            response.managerId,
        ];
        connectDBquery(sql, values, (err) => {
            if (err) throw err;
        
        console.log("Employee added!");
    });
    })
        .catch ((err) => {
        console.log(error);
    });
    
})
}