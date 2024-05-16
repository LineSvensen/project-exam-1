const loading = document.querySelector('.loader');
const loadingBox = document.querySelector('.loader-container');

async function fetchBlogPosts() {
    try {
        loading.style.display = 'flex';
        loadingBox.style.display = 'flex';

        const response = await fetch('https://v2.api.noroff.dev/blog/posts/line_svensen/');
        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

async function displayBlogPosts() {
    const blogPostsContainer = document.querySelector(".showing-posts");
    loading.style.display = 'flex';
    loadingBox.style.display = 'flex';
    const blogPosts = await fetchBlogPosts();
    loading.style.display = 'none';
    loadingBox.style.display = 'none';

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
            <h3 class="title-on-post">${post.title}</h3>
            <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
        `;

        postElement.addEventListener('click', () => {
            window.location.href = `./post/post-details.html?id=${post.id}`;
        });

        blogPostsContainer.appendChild(postElement);
    });
}

async function displayBannerPosts() {
    const bannerContainer = document.querySelector(".carousel-content");
    loading.style.display = 'flex';
    loadingBox.style.display = 'flex';
    const blogPosts = await fetchBlogPosts();
    loading.style.display = 'none';
    loadingBox.style.display = 'none';

    const bannerPosts = [];
    for (let i = 0; i < 3 && i < blogPosts.length; i++) {
        const post = blogPosts[i];
        if (post) {
            const postElement = document.createElement('div');
            postElement.classList.add('banner-post');
            postElement.innerHTML = `
                <h3 class="title-on-post">${post.title}</h3>
                <div class="carousel-image-container">
                    <img class="banner-image" src="${post.media.url}" alt="${post.media.alt}">
                    <span><button class="read-full-post" data-post-id="${post.id}">Read full post</button></span>
                </div>
            `;
            bannerContainer.appendChild(postElement);
            bannerPosts.push(postElement);
        }
    }

    bannerPosts.forEach(post => {
        const readFullPostButton = post.querySelector('.read-full-post');
        readFullPostButton.addEventListener('click', () => {
            const postId = readFullPostButton.dataset.postId;
            window.location.href = `./post/post-details.html?id=${postId}`;
        });
    });

    return bannerPosts;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded');
    const bannerPosts = await displayBannerPosts();

    const prevSlideButton = document.querySelector('.prev-slide');
    const nextSlideButton = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.dots-container');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;

    showPost(currentIndex);
    updateDots(currentIndex);

    prevSlideButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + bannerPosts.length) % bannerPosts.length;
        showPost(currentIndex);
        updateDots(currentIndex);
    });

    nextSlideButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % bannerPosts.length;
        showPost(currentIndex);
        updateDots(currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showPost(currentIndex);
            updateDots(currentIndex);
        });
    });

    function showPost(index) {
        bannerPosts.forEach((post, i) => {
            post.style.display = i === index ? 'block' : 'none';
        });
    }

    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
});

async function displayInitialPosts() {
    const blogPostsContainer = document.querySelector('.showing-posts');
    loading.style.display = 'flex';
    loadingBox.style.display = 'flex';
    const blogPosts = await fetchBlogPosts();
    loading.style.display = 'none';
    loadingBox.style.display = 'none';

    const visiblePosts = blogPosts.slice(0, 12);

    visiblePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
            <h3 class="title-on-post">${post.title}</h3>
            <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
            <span><button class="read-full-post" id="rfp-btn" data-post-id="${post.id}">Read full post</button></span>
        `;

        postElement.addEventListener('click', () => {
            window.location.href = `./post/post-details.html?id=${post.id}`;
        });

        blogPostsContainer.appendChild(postElement);
    });

    return blogPosts;
}

async function displayAllPosts() {
    const blogPostsContainer = document.querySelector('.showing-posts');
    loading.style.display = 'flex';
    loadingBox.style.display = 'flex';
    const blogPosts = await fetchBlogPosts();
    loading.style.display = 'none';
    loadingBox.style.display = 'none';

    blogPostsContainer.innerHTML = '';

    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
            <h3 class="title-on-post">${post.title}</h3>
            <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
            <span><button class="read-full-post" id="rfp-btn" data-post-id="${post.id}">Read full post</button></span>
        `;

        postElement.addEventListener('click', () => {
            window.location.href = `./post/post-details.html?id=${post.id}`;
        });

        blogPostsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded');
    const blogPosts = await displayInitialPosts();

    const seeMoreButton = document.getElementById('see-more-button');
    seeMoreButton.addEventListener('click', async () => {
        await displayAllPosts();
        seeMoreButton.style.display = 'none';
    });
});