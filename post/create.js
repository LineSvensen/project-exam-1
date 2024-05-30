console.log('Access Token:', sessionStorage.getItem('accessToken'));

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('create-post-form');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(createPostForm);
        const title = formData.get('title');
        const body = formData.get('body');
        const imageUrl = formData.get('image');

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('https://v2.api.noroff.dev/blog/posts/line_svensen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    'title': title,
                    'body': body,
                    'media': {
                        'url': imageUrl,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            window.location.href = 'admin.html';
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    });
});