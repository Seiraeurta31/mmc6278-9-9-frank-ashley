CREATE DATABASE mysql_project_db;
USE mysql_project_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE user_profiles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  name_of_insurance VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);


CREATE TABLE medicine (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  medicine_name VARCHAR(50) NOT NULL,
  dosage_mg INT NOT NULL,
  frequency VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

