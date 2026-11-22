const reviewsList = document.getElementById("reviews-list");
let lastReviewId = 0;

function loadReviews() {
    fetch("reviews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(reviews => {
            reviews.forEach(review => {
                const reviewEntry = createReviewElement(review);
                reviewsList.appendChild(reviewEntry);
            })
        })
        .catch(error => {
            console.error("There was a problem:", error);
        })
};

function handleReviewSubmit(event) {
    event.preventDefault();

    // * allow the user to submit a new review
    // access the form inputs
    const titleInput = document.getElementById("book-title");
    const title = titleInput.value;
    const textInput = document.getElementById("review-text");
    const text = textInput.value;
    const ratingInput = document.getElementById("rating");
    const rating = ratingInput.value;
    // create a review object with the form inputs

    lastReviewId += 1;

    const newReview = {
        id: lastReviewId,
        title: title,
        reviewText: text,
        rating: rating,
        likes: 0,
        reposts: 0
    };

    // STOPPED HERE:
    // * add the new review to the top of the feed
    const latestReview = createReviewElement(newReview);
    const curTopReview = reviewsList.firstElementChild;
    reviewsList.insertBefore(latestReview, curTopReview);

    event.target.reset();
};

function createReviewElement(review) {
    const newReview = document.createElement("div");
    newReview.className = "review-item";
    newReview.innerHTML = `
        <h3>${review.title}</h3>
        <p>${review.reviewText}</p>
        <p>Rating: ${review.rating}</p>
        <button id="like-button" data-id=${review.id} data-isLiked="false" onclick="toggleLike(this)">Like (${review.likes})</button>
        <button id="repost-button" data-isReposted="false" onclick="repostReview(this)">Repost (${review.reposts})</button>
    `;
    return newReview;
};

function toggleLike(currButton) {
    // turn likeState into a boolean
    const likeState = currButton.getAttribute("data-isLiked") === "true";
    let likeCount = parseInt(currButton.textContent.match(/\d+/));
    
    // dislike the review
    if (likeState === true) {
        currButton.setAttribute("data-isLiked", "false");
        likeCount -= 1;
        currButton.textContent = `Like (${likeCount})`;
    // like the review
    } else {
        currButton.setAttribute("data-isLiked", "true");
        likeCount += 1
        currButton.textContent = `Like (${likeCount})`;
    }
};

function repostReview(currButton) {
    const repostState = currButton.getAttribute("data-isReposted") === "true";
    let repostCount = parseInt(currButton.textContent.match(/\d+/));

    // un-repost the post
    if (repostState === true) {
        currButton.setAttribute("data-isReposted", "false");
        repostCount -= 1
        currButton.textContent = `Repost (${repostCount})`;
    } else {
        currButton.setAttribute("data-isReposted", "true");
        repostCount += 1
        currButton.textContent = `Repost (${repostCount})`
    }
};

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", handleReviewSubmit);

});