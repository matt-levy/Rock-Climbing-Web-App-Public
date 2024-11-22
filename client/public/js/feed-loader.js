// Test Posts
let posts = [
    {
        title: "First Ascent",
        climbName: "Sunset Crack",
        grade: "5.10",
        body: "Had an amazing time working on this climb. The crux was challenging but super rewarding!",
        timestamp: new Date(),
    },
    {
        title: "Epic Multi-pitch",
        climbName: "The Nose",
        grade: "5.9",
        body: "What an adventure! The exposure on pitch 16 was incredible. Can't wait to go back.",
        timestamp: new Date(),
    },
];

function createPostHtml(post) {
    return `
        <div class="post">
            <h2>${post.title}</h2>
            <h3>${post.climbName} - Grade: ${post.grade}</h3>
            <p>${post.body}</p>
        </div>
    `;
}

// Filter posts using the dropdown menu
function filterPostsByGrade(grade) {
    // If no grade is selected, return all posts
    if (!grade) {
        return posts;
    }

    return posts.filter((post) => post.grade === grade);
}

function loadPostsFromServer() {
    fetch("http://localhost:1337/api/post")
        .then((response) => response.json())
        .then((data) => {
            posts = data; // Update the local posts array with data from server
            populateFeed(posts);
        })
        .catch((error) =>
            console.error("Failed to load posts from server:", error)
        );
}

// Function to send new post to server and update the feed
function sendPostToServer(newPost) {
    fetch('http://localhost:1337/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
        .then(response => response.json())
        .then(post => {
            posts.unshift(post); // Add to front of array (top of feed)
            populateFeed(posts);
        })
        .catch(error => console.error('Failed to send post to server:', error));
}

// Function to handle form submission for new posts
document.getElementById("newPostForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent empty form from submitting

    const title = document.getElementById("postTitle").value;
    const climbName = document.getElementById("climbName").value;
    const climbGrade = document.getElementById("climbGrade").value;
    const body = document.getElementById("postBody").value;

    const newPost = {
        title: title,
        climbName: climbName,
        grade: climbGrade,
        body: body
    };

    console.log(newPost); 

    sendPostToServer(newPost);

    document.getElementById('newPostForm').reset(); // Reset form after a post
});

function populateFeed(postsToDisplay) {
    const feedElement = document.getElementById("feed");
    feedElement.innerHTML = ""; // Reset feed when page reloads

    // Create post HTML and add them to the feed
    postsToDisplay.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = createPostHtml(post);
        feedElement.appendChild(postElement);
    });
}

document.getElementById("postButton").addEventListener("click", function () {
    const formContainer = document.getElementById("postFormContainer");
    formContainer.style.display =
        formContainer.style.display === "block" ? "none" : "block";
});

// Initial load from server
window.addEventListener('load', function () {
    loadPostsFromServer();
});

// Reload feed when filter has changed
document
    .getElementById("gradeDropdown")
    .addEventListener("change", function () {
        const selectedGrade = this.value;
        const filteredPosts = selectedGrade
            ? filterPostsByGrade(selectedGrade)
            : posts;
        populateFeed(filteredPosts);
    });
