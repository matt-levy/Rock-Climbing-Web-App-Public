// Function to initialize user session
exports.initSession = (req, user) => {
    req.session.userId = user.id;  // Store user ID in session
    req.session.isLoggedIn = true; // Flag session as logged in
};

// Function to check if user is logged in
exports.isLoggedIn = (req) => {
    return req.session.isLoggedIn;
};

// Function to destroy user session
exports.destroySession = (req) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) reject(err);
            resolve();
        });
    });
};
