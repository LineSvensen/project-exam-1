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

    // const readFullPostButtons = document.querySelectorAll(".read-full-post");
    // readFullPostButtons.forEach(button => {
    //     button.addEventListener("click", () => {
    //         // Redirect to the full post page using the post ID from the API response
    //         window.location.href = `post-details.html?id=${responseData.data.id}`;
    //     });
    // });

    return bannerPosts;
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded");
    const bannerPosts = await displayBannerPosts();

    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;

    // Initially show the first post
    showPost(currentIndex);

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + bannerPosts.length) % bannerPosts.length;
        showPost(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % bannerPosts.length;
        showPost(currentIndex);
    });

    function showPost(index) {
        bannerPosts.forEach((post, i) => {
            post.style.display = i === index ? "block" : "none";
        });
    }
});