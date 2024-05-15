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
            const response = await fetch('https://v2.api.noroff.dev/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGluZV9zdmVuc2VuIiwiZW1haWwiOiJsaW5zdmUwMTI4M0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxNDg1MTA4N30.NLVffV1zoZymsgVcbu9S8SFsKBWXaXIF6wpq6rkiN-o'
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
            console.error('Error registering user:', error);
            alert('An error occurred while registering the user. Please try again later.');
        }
    });
});