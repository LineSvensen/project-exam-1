const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
console.log(postId);
const postDetailsContainer = document.querySelector('.post-details');
const postTitleElement = postDetailsContainer.querySelector('.post-title');
const postContentElement = postDetailsContainer.querySelector('.post-content');

async function fetchPostDetails(postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/line_svensen/${postId}`);
        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching post details:', error);
        return null;
    }
}

async function displayPostDetails(post) {
    postTitleElement.textContent = post.title;
    postContentElement.innerHTML = `
        <div class="created-author-share-section">
            <p>Author: ${post.author.name}</p>
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
            <span><button class="share-button"><i class="fa-solid fa-share-nodes"></i></button></span>
        </div>
        <p>${post.body}</p>
        <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('post-details.js loaded');
    const post = await fetchPostDetails(postId);
    if (post) {
        displayPostDetails(post);
    }

    const shareButton = document.querySelector('.share-button');
    shareButton.addEventListener('click', () => {
        const shareUrl = `${window.location.href}?id=${postId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert('The URL is copied :-)');
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    });
});