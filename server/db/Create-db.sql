-- Create the database
CREATE DATABASE climbing_community;

-- Connect to the database (This line is for documentation; actual connection depends on your environment setup)
-- \c climbing_community

-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
user_id UUID PRIMARY KEY,
f_name VARCHAR(255) NOT NULL,
l_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

-- Create the posts table
CREATE TABLE posts (
id UUID PRIMARY KEY,
user_id UUID,
title VARCHAR(255) NOT NULL,
climb_name VARCHAR(255),
grade VARCHAR(50),
body TEXT,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
--FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert initial data into users table (optional)
INSERT INTO users (username, email, password) VALUES 
('john_doe', 'john@example.com', 'securepassword123'),
('jane_doe', 'jane@example.com', 'securepassword456');

-- Insert initial data into posts table (optional)
INSERT INTO posts (user_id, title, body, climb_grade) VALUES 
('First Ascent', 'Silence', '5.13', 'Great climb up the north face of Mount Fake.'),
('Sunset Climb', 'Menagerie', '5.9', 'Beautiful evening climb with a perfect sunset.');