const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

// router.post('/login', async (req, res) => {
//     res.json({ message: "This is a test" });
// });

// Define the route handler for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request
    console.log("Received email:", email);

    try {
        const user = await userService.authenticateUser(email, password);
        if (user) {
            // Authentication successful
            res.json({ message: "Login successful", user });
            req.session.user = user;
            req.session.id = user.userId;
            req.session.isLoggedIn = true;
            console.log("user:", req.session.user);
        } else {
            // Authentication failed
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: "Server error" });
    }
});


// Export the router
module.exports = router;
