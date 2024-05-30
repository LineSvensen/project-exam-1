document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('https://v2.api.noroff.dev/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            const token = data.data.accessToken;
            sessionStorage.setItem('token', token);

            window.location.href = '../post/admin.html';
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    });
});