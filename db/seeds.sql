INSERT INTO departments (department_name)
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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sophia', 'Tunner', 1 , 1),
('Tom', 'Cruz', 2,2),
('Jason','Durro', 3,3),
('Charls','Mcd', 4,4),
('James', 'Bond', 5,5),
('Mary','Jane',6,6),
('Santa', 'Cruz', 7 ,7),
('Charls','TheFirst', 8,8),
('Ninja', 'Tech', 9,9),
('Base','Nector', 10,10);