document.getElementById("loginButton").addEventListener('click', function() {
    alert("clicked!");
    const form = document.getElementById('loginForm');
    const email = form.querySelector('[name="email"]').value; // Using name attribute selectors
    const password = form.querySelector('[name="password"]').value; // Using name attribute selectors

    // Send a POST request to the server with the email and password
    fetch('/api/login/login', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                throw new Error(data.message || 'Failed to login');
            });
        }
    })
    .then(data => {
        alert('Login successful:', data);
        window.location.href = '/home'; // Redirect to home page upon successful login
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message); // Display error message if login fails
    });
});
