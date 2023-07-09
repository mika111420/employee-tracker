INSERT INTO department (name)
VALUES 
('Production'), 
('Operations'), 
('Legal'), 
('Information Technology'), 
('Management'), 
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
('Lead Engineer', 100000, 1), 
('Accountant', 90000, 2), 
('Lawyer', 90000, 3), 
('Software Engineer', 70000, 4), 
('Project Lead', 120000, 5), 
('Telemarketer', 60000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jim', 'Carrey', 2, 5),
('Jessica', 'Mason', 2, 5),
('David', 'Brown', 1, 5),
('Sarah', 'Davis', 4, 5),
('Daniel', 'Taylor', 5, NULL),
('Olivia', 'Anderson', 6, 9),
('Buzzy', 'Jack', 3, 9),
('Nikki', 'Desiree', 1, NULL),
