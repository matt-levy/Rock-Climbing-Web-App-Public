let userController = require('../controller/userController');

console.log("Module userService loaded");

const { Pool, Client } = require( 'pg' );
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});


exports.getAllUsers = async () => {
    const query = "SELECT firstname, lastname, email FROM users;"; 
    try {
        const res = await pool.query(query);
        return res.rows.map(user => ({
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email
        }));
    } catch (err) {
        console.error('Failed to retrieve users:', err);
        throw new Error('Error retrieving users from the database');
    }
};


exports.saveUser = async (user) => {
    const query = "INSERT INTO users (user_id, f_name, l_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    const values = [user.userId, user.firstName, user.lastName, user.email, user.password];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error(err.stack);
        throw new Error('Error saving user to the database');
    }
};

exports.authenticateUser = async (email, password) => {
    console.log("authenticating");
    const query = 'SELECT user_id, email, password FROM users WHERE email = $1';
    try {
        // Check if user exists with that email
        const { rows } = await pool.query(query, [email]);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        const user = rows[0];


        // Compare provided password with stored hash
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Invalid credentials');
        }

        return { id: user.id, email: user.email };  // Return user info if password is correct
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    const query = 'SELECT user_id, firstname, lastname, email FROM users WHERE email = $1;';
    try {
        const { rows } = await pool.query(query, [email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (err) {
        console.error('Failed to retrieve user by email:', err);
        throw new Error('Error retrieving user from the database');
    }
};

exports.deleteUserByEmail = async (email) => {
    const query = 'DELETE FROM users WHERE email = $1 RETURNING *;';
    try {
        const { rows } = await pool.query(query, [email]);
        return rows.length > 0;  // Returns true if a user was deleted
    } catch (err) {
        console.error('Failed to delete user:', err);
        throw new Error('Error deleting user from the database');
    }
};

exports.updateUserByEmail = async (email, userDetails) => {
    const { firstName, lastName } = userDetails;
    const query = 'UPDATE users SET firstname = $1, lastname = $2 WHERE email = $3 RETURNING *;';
    try {
        const { rows } = await pool.query(query, [firstName, lastName, email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (err) {
        console.error('Failed to update user:', err);
        throw new Error('Error updating user in the database');
    }
};

exports.updateUserFirstNameByEmail = async (email, firstName) => {
    const query = 'UPDATE users SET firstname = $1 WHERE email = $2 RETURNING *;';
    try {
        const { rows } = await pool.query(query, [firstName, email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (err) {
        console.error('Failed to patch user first name:', err);
        throw new Error('Error patching user first name in the database');
    }
};

