document.getElementById('signupButton').addEventListener('click', function() {
    const form = document.getElementById('signupForm');
    
    // Collect the form data
    const firstname = form.firstname.value.trim();
    const lastname = form.lastname.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();

    // Simple client-side validation
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Prepare data to send to the server
    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
    };

    // Send the data to the server using fetch API
    fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then(data => {
        console.log('Success:', data);
        alert('Signup successful!');
        // Redirect
        window.location.href = '/home';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error signing up.');
    });
});
