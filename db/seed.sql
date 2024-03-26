INSERT INTO department (id, department_name)
VALUES  (1,"Department1"),
        (2,"Department2");    
       

INSERT INTO role (title, salary, dept_id)
VALUES  ("Title1", 100.00, 1),
        ("Title2", 150.00, 2);
       
       
    
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "First1", "Last1", 1, 10),
        (2, "First2", "Last2", 2, 10),
        (3, "First3", "Last3", 2, 10);
       