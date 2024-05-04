console.log('Access Token:', sessionStorage.getItem('accessToken'));

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('createPostForm');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(createPostForm);
        const title = formData.get('title');
        const body = formData.get('body');
        const imageUrl = formData.get('image');

        try {
            const response = await fetch('https://v2.api.noroff.dev/blog/posts/line_svensen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGluZV9zdmVuc2VuIiwiZW1haWwiOiJsaW5zdmUwMTI4M0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcxNDg1MTA4N30.NLVffV1zoZymsgVcbu9S8SFsKBWXaXIF6wpq6rkiN-o", // Assuming the token is NOT stored as "accessToken"
                },
                body: JSON.stringify({
                    "title": title,
                    "body": body,
                    "media": {
                        "url": imageUrl,
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            // Redirect to dashboard or desired page
            window.location.href = 'admin.html';
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    });
});