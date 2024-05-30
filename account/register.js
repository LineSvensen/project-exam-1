document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const venueManager = false;

        const requestBody = {
            name,
            email,
            password
        };

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://v2.api.noroff.dev/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                alert('User registered successfully!');

            } else {
                const data = await response.json();
                if (data && data.message) {
                    alert(`Error: ${data.message}`);
                } else {
                    alert('An error occurred during registration.');
                }
            }
        } catch (error) {
            alert('An error occurred while registering the user. Please try again later.');
        }
    });
});