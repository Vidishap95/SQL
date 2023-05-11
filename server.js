const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

// connect to datbase
const employee_tracker_db = mysql.createConnection(
    {
        host:'127.0.0.1',
        user:'root',
        database:'employee_tracker_db',
        password: '',
    },
    // console.log('Connected to database')
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
            "View all Departments",
            "View all Roles",
            "Add a Department",
            "Add a Role",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
        ],
    },
  ])
  .then ((response) => {
    switch (response.menuOptions) {
        case "View all Departments":
            viewAllDepartments ();
            break;
        case "View all Roles":
            viewAllRoles ();
            break;
        case "View all Employees":
            viewAllEmployees ();
            break;
        case "Add a Department":
            addDepartment ();
            break;
        case "Add a Role":
            addRole ();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployee();
            break;
        case "Remove Employee":
            RemoveEmployee();
            break;
    }
 })
}
const viewAllDepartments = () => {
    employee_tracker_db.query('SELECT * FROM departments', (err,res) => {
        if (err) throw err;
        console.table(res); //shows department table from db ie employee_db
        question();
    });
};

const viewAllEmployees = () => {
    employee_tracker_db.query('SELECT * FROM employees', (err,res) => {
        if (err) throw err;
        
        console.table(res); //shows all employees from table employee_db
        question();
    });
};

const viewAllRoles = () => {
    employee_tracker_db.query('SELECT * FROM roles', (err,res) => {
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
        employee_tracker_db.query(
            `INSERT INTO departments (name) VALUES(?)`,
            [response.newDepartment],
        (err,  res) => {
            if(err) throw err;
            console.log('New department created!');
            question();
        });
    });
}

const addRole = () => {
    employee_tracker_db.query ("SELECT * FROM departments", (err, res) => {
        if (err) throw err;

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
            choices: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
            ]
        },
    ])
    .then((response) => {
        employee_tracker_db.query(`INSERT INTO role (title, salary, department_id)
        VALUES('${response.newRole}', '${response.salary}', '${response.deptList}')`,
        (err, res) => {
            if (err) throw err;
            console.log('New role created!');
            question();
        });
    });
});
}

const addEmployee = () => {
    // retrieve roles form the database
    employee_tracker_db.query('SELECT id, title FROM roles', (err, resRoles) => {
        if (err) throw err;  
    employee_tracker_db.query(
        'SELECT id, CONCAT(first_name, " ",last_name) AS name FROM employee',
        (err, resEmployee) => {
            if (err) throw err;
        });

    const roles = resRoles.map(({id, titile}) => ({
        name: titile,
        value: id,
    }));

    //retrieve employees from the database to update as managers
    employee_tracker_db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',(err,resEmployee) => {
    if(err) throw err;
   
    const managers = resEmployee.map(({ id, name}) => ({
       name,
       value: id,
    }));

    });
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
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        const values = [
            response.firstName,
            response.lastName,
            response.roleId,
            response.managerId,
        ];
        employee_tracker_db.query(sql, values, (err) => {
            if (err) throw err;
        
        console.log("Employee added!");
        question();
    });
    })
        .catch ((err) => {
        console.log(err);
    });
    
});
};

const updateEmployee = () => {
    employee_tracker_db.query('SELECT * FROM employee', (err, resEmployee) => {
        if (err) throw err;
        employee_tracker_db
    })
    inquirer
    .prompt ([
        {
            type: 'list',
            message: 'Which employee you want to update?',
            name: 'updateEmployee',
            choices: resEmployee.map (
                (employee) => `${employee.firstName} ${employee.lastName}`
            ),
        },
        {
            type: "list",
            name: 'role',
            message: "Select new role:",
            choices: resRoles.map((role) => role.title),
        }
    ])
    .then((response) => {
        employee_tracker_db.query(`UPDATE employee SET  role_id = ? WHERE CONCAT(first_name, "  ", last_name) =?`,
        [response.role, response.updateEmployee],
        (err, res) => {
            if (err) throw err;
            console.log('Employee Updated!');
            question();
        }
        );
});
};

//call question function to start application
question();