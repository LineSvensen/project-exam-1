async function fetchBlogPosts() {
    try {
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/line_svensen/");
        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

async function displayBlogPosts() {
    const blogPostsContainer = document.querySelector(".showing-posts");
    const blogPosts = await fetchBlogPosts();

    blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
        `;

        // Add click event listener to each post element
        postElement.addEventListener('click', () => {
            window.location.href = `./post/post-details.html?id=${post.id}`;
        });

        blogPostsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    displayBlogPosts();
});


async function displayBannerPosts() {
    const bannerContainer = document.querySelector(".carousel-content");
    const blogPosts = await fetchBlogPosts();

    // Initially hide all posts
    const bannerPosts = [];
    for (let i = 0; i < 3 && i < blogPosts.length; i++) {
        const post = blogPosts[i];
        if (post) {
            const postElement = document.createElement("div");
            postElement.classList.add("banner-post");
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <div class="carousel-image-container">
                    <img class="banner-image" src="${post.media.url}" alt="${post.media.alt}">
                    <button class="read-full-post" data-post-id="${post.id}">Read full post</button>
                </div>    
            `;
            bannerContainer.appendChild(postElement);
            bannerPosts.push(postElement);
        }
    }

    // Add event listeners to the "Read full post" buttons
    bannerPosts.forEach(post => {
        const readFullPostButton = post.querySelector(".read-full-post");
        readFullPostButton.addEventListener("click", () => {
            const postId = readFullPostButton.dataset.postId;
            window.location.href = `./post/post-details.html?id=${postId}`;
        });
    });

    return bannerPosts;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded");
    const bannerPosts = await displayBannerPosts();

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots-container");
    const dots = dotsContainer.querySelectorAll(".dot");
    let currentIndex = 0;

    // Initially show the first post
    showPost(currentIndex);
    updateDots(currentIndex);

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + bannerPosts.length) % bannerPosts.length;
        showPost(currentIndex);
        updateDots(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % bannerPosts.length;
        showPost(currentIndex);
        updateDots(currentIndex);
    });

    // Add event listeners to the dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showPost(currentIndex);
            updateDots(currentIndex);
        });
    });

    function showPost(index) {
        bannerPosts.forEach((post, i) => {
            post.style.display = i === index ? "block" : "none";
        });
    }

    function updateDots(index) {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    }
});