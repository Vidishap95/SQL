USE employee_tracker_db;

INSERT INTO departments (name)
VALUES
('Engineer'),
('Human Resources'),
('Finance'),
('Marketing'),
('CRM'),
('Legal'),
('Executive Board'),
('Information Technology');

INSERT INTO roles ( title, salary, department_id)
VALUES
('CEO', 500000.00, 1),
('HR Manager', 200000, 2),
('Finance Manager', 150000, 3),
('Marketing Head', 222500, 4),
('CRM Manager', 100000, 5),
('Legal Manager', 125000, 6),
('Senior Engineer', 150000, 7),
('IT Head',175000, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Sophia', 'Tunner', 1 , NULL),
('Tom', 'Cruz', 2,1),
('Jason','Durro', 3,1),
('Charls','Mcd', 4,2),
('James', 'Bond', 5,1),
('Mary','Jane',6,3),
('Santa', 'Cruz', 7 ,2),
('Charls','TheFirst', 8,2),
('Ninja', 'Tech', 5,1),
('Base','Nector', 1,2);