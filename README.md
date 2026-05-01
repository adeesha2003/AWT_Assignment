# Task Management System Frontend

## Project Overview
This project is a simple Task Management System frontend developed for the assignment.
The system allows users to register, login, add tasks, view tasks, and logout using a PHP backend API.

## Features
- User Registration
- User Login
- Add New Tasks
- View Task List
- Logout Function

## Technologies Used
- HTML
- CSS
- JavaScript
- PHP (Backend API)
- MySQL

## Backend API Files Used
- register.php
- login.php
- add_task.php
- get_task.php
- logout.php
- auth.php
- db.php

## Project Structure
Task_App/
│
├── index.html
├── style.css
├── script.js
│
├── register.php
├── login.php
├── add_task.php
├── get_task.php
├── logout.php
├── auth.php
├── db.php

## Database Setup

Create database:
CREATE DATABASE task_app;

Create users table:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255) DEFAULT NULL
);

Create tasks table:
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    task TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

## How to Run
1. Place the project folder inside htdocs
2. Start Apache and MySQL in XAMPP
3. Create the database task_app
4. Create the required tables
5. Open in browser:
http://localhost/Task_App/index.html

## Group Members
1. D/BIT/24/0064 - A.M. Weerasinghe
2. D/BIT/24/0055 - O.K.D.A. Dilmira
3. D/BIT/24/0022 - H.G.R.S. Hathnapitiya
4. D/BIT/24/0020 - J.A.D.D. Jayawickrama
5. D/BIT/24/0052 - W.S.T. Gunawardana
