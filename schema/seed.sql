USE mysql_project_db;

INSERT INTO users (username, password)
VALUES ("banana", "$2b$10$/1UfZvXYrToAGa5mO1IbfesmFQJ42WIlI60swCyafhzrB/2KcD1RK");

INSERT INTO users (username, password)
VALUES ("unicorn", "$2b$10$ni4HOgqdvjn3crsjEZ26VOUAZECTda3AWE9mGIy2ygUwMtUFH8wHe");

INSERT INTO user_profiles (first_name, last_name, age, name_of_insurance, user_id)
VALUES ("Ashley", "Frank", 40, "Cigna", 2);

INSERT INTO medicine (medicine_name, dosage_mg, frequency, user_id)
VALUES ("prozac", 20, "1x daily", 2);

INSERT INTO medicine (medicine_name, dosage_mg, frequency, user_id)
VALUES ("NAC", 600,"2x daily", 2);