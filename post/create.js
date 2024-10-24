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
            const response = await fetch('https://v2.api.noroff.dev/blog/posts/linesven', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-Noroff-API-Key': '6e9bfd26-05dc-4cf2-b1e2-d1a6ff3fc7c9'
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
            alert('Failed to create post. Please try again.');
        }
    });
});