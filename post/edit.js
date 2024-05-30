document.addEventListener('DOMContentLoaded', async () => {
    const postDropdown = document.getElementById('post-dropdown');
    const editPostForm = document.getElementById('edit-post-form');
    const deleteButton = document.getElementById('delete-btn');

    try {
        const postsResponse = await fetchPosts();
        const posts = postsResponse.data;
        posts.forEach(post => {
            const option = document.createElement('option');
            option.value = post.id;
            option.textContent = post.title;
            postDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }

    postDropdown.addEventListener('change', async () => {
        const postId = postDropdown.value;
        const selectedPost = await fetchPost(postId);

        document.getElementById('title').value = selectedPost.data.title;
        document.getElementById('body').value = selectedPost.data.body;
        document.getElementById('image').value = selectedPost.data.media.url;
    });

    editPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const postId = postDropdown.value;
        const formData = new FormData(editPostForm);
        const updatedPost = {
            title: formData.get('title'),
            body: formData.get('body'),
            media: {
                url: formData.get('image')
            }
        };
        await updatePost(postId, updatedPost);
        alert('Changes saved successfully!');
    });

    deleteButton.addEventListener('click', async () => {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            const postId = postDropdown.value;
            await deletePost(postId);
            alert('Post deleted successfully!');
            location.reload();
        }
    });
});

async function fetchPosts() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/blog/posts/line_svensen/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

async function fetchPost(postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/line_svensen/${postId}`);
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}

async function updatePost(postId, updatedPost) {
    const token = sessionStorage.getItem('token');
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/line_svensen/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedPost)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating post:', error);
        return null;
    }
}

async function deletePost(postId) {
    const token = sessionStorage.getItem('token');
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/line_svensen/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to delete post');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
}