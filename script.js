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
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
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




async function displayBannerPosts() {// document.addEventListener('DOMContentLoaded', async () => {
//     console.log("DOM loaded");
//     displayBlogPosts();
// });
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

    const prevSlideButton = document.querySelector(".prev-slide");
    const nextSlideButton = document.querySelector(".next-slide");
    const dotsContainer = document.querySelector(".dots-container");
    const dots = dotsContainer.querySelectorAll(".dot");
    let currentIndex = 0;

    // Initially show the first post
    showPost(currentIndex);
    updateDots(currentIndex);

    prevSlideButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + bannerPosts.length) % bannerPosts.length;
        showPost(currentIndex);
        updateDots(currentIndex);
    });

    nextSlideButton.addEventListener("click", () => {
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

// New code for "See more" button and initial display of posts
async function displayInitialPosts() {
    const blogPostsContainer = document.querySelector(".showing-posts");
    const blogPosts = await fetchBlogPosts();

    const visiblePosts = blogPosts.slice(0, 12); // Display only the first 12 posts initially

    visiblePosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");
        postElement.innerHTML = `
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
            <button class="read-full-post" data-post-id="${post.id}">Read full post</button>
        `;

        // Add click event listener to each post element
        postElement.addEventListener('click', () => {
            window.location.href = `./post/post-details.html?id=${post.id}`;
        });

        blogPostsContainer.appendChild(postElement);
    });

    return blogPosts;
}

async function displayAllPosts() {
    const blogPostsContainer = document.querySelector(".showing-posts");
    const blogPosts = await fetchBlogPosts();

    blogPostsContainer.innerHTML = ''; // Clear previous posts

    blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");
        postElement.innerHTML = `
            <p>Created: ${new Date(post.created).toLocaleDateString()}</p>
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
            <button class="read-full-post" data-post-id="${post.id}">Read full post</button>
        `;

        // Add click event listener to each post element
        postElement.addEventListener('click', () => {
            window.location.href = `./post/post-details.html?id=${post.id}`;
        });

        blogPostsContainer.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM loaded");
    const blogPosts = await displayInitialPosts();

    const seeMoreButton = document.getElementById('see-more-button');
    seeMoreButton.addEventListener('click', async () => {
        await displayAllPosts();
        seeMoreButton.style.display = 'none'; // Hide the "See more" button after displaying all posts
    });
});









// without the show more function:

// async function fetchBlogPosts() {
//     try {
//         const response = await fetch("https://v2.api.noroff.dev/blog/posts/line_svensen/");
//         const responseData = await response.json();
//         return responseData.data;
//     } catch (error) {
//         console.error('Error fetching blog posts:', error);
//         return [];
//     }
// }
//
// async function displayBlogPosts() {
//     const blogPostsContainer = document.querySelector(".showing-posts");
//     const blogPosts = await fetchBlogPosts();
//
//     blogPosts.forEach(post => {
//         const postElement = document.createElement("div");
//         postElement.classList.add("blog-post");
//         postElement.innerHTML = `
//             <h3>${post.title}</h3>
//             <p>${post.body}</p>
//             <img class="post-image" src="${post.media.url}" alt="${post.media.alt}">
//         `;
//
//         // Add click event listener to each post element
//         postElement.addEventListener('click', () => {
//             window.location.href = `./post/post-details.html?id=${post.id}`;
//         });
//
//         blogPostsContainer.appendChild(postElement);
//     });
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     console.log("DOM loaded");
//     displayBlogPosts();
// });
//
//
// async function displayBannerPosts() {
//     const bannerContainer = document.querySelector(".carousel-content");
//     const blogPosts = await fetchBlogPosts();
//
//     // Initially hide all posts
//     const bannerPosts = [];
//     for (let i = 0; i < 3 && i < blogPosts.length; i++) {
//         const post = blogPosts[i];
//         if (post) {
//             const postElement = document.createElement("div");
//             postElement.classList.add("banner-post");
//             postElement.innerHTML = `
//                 <h3>${post.title}</h3>
//                 <div class="carousel-image-container">
//                     <img class="banner-image" src="${post.media.url}" alt="${post.media.alt}">
//                     <button class="read-full-post" data-post-id="${post.id}">Read full post</button>
//                 </div>
//             `;
//             bannerContainer.appendChild(postElement);
//             bannerPosts.push(postElement);
//         }
//     }
//
//     // Add event listeners to the "Read full post" buttons
//     bannerPosts.forEach(post => {
//         const readFullPostButton = post.querySelector(".read-full-post");
//         readFullPostButton.addEventListener("click", () => {
//             const postId = readFullPostButton.dataset.postId;
//             window.location.href = `./post/post-details.html?id=${postId}`;
//         });
//     });
//
//     return bannerPosts;
// }
//
// document.addEventListener('DOMContentLoaded', async () => {
//     console.log("DOM loaded");
//     const bannerPosts = await displayBannerPosts();
//
//     const prevSlideButton = document.querySelector(".prevslide");
//     const nextSlideButton = document.querySelector(".nextslide");
//     const dotsContainer = document.querySelector(".dots-container");
//     const dots = dotsContainer.querySelectorAll(".dot");
//     let currentIndex = 0;
//
//     // Initially show the first post
//     showPost(currentIndex);
//     updateDots(currentIndex);
//
//     prevSlideButton.addEventListener("click", () => {
//         currentIndex = (currentIndex - 1 + bannerPosts.length) % bannerPosts.length;
//         showPost(currentIndex);
//         updateDots(currentIndex);
//     });
//
//     nextSlideButton.addEventListener("click", () => {
//         currentIndex = (currentIndex + 1) % bannerPosts.length;
//         showPost(currentIndex);
//         updateDots(currentIndex);
//     });
//
//     // Add event listeners to the dots
//     dots.forEach((dot, index) => {
//         dot.addEventListener("click", () => {
//             currentIndex = index;
//             showPost(currentIndex);
//             updateDots(currentIndex);
//         });
//     });
//
//     function showPost(index) {
//         bannerPosts.forEach((post, i) => {
//             post.style.display = i === index ? "block" : "none";
//         });
//     }
//
//     function updateDots(index) {
//         dots.forEach((dot, i) => {
//             dot.classList.toggle("active", i === index);
//         });
//     }
//
// });