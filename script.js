const reviewsList = document.getElementById("reviews-list");

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

function handleReviewSubmit() {
    console.log("handleReviewSubmit called!");
};

function createReviewElement(review) {
    const newReview = document.createElement("div");
    newReview.className = "review-item";
    newReview.innerHTML = `
        <h3>${review.title}</h3>
        <p>${review.reviewText}</p>
        <p>Rating: ${review.rating}</p>
        <button onclick="toggleLike()">Like</button>
        <button onclick="repostReview()">Repost</button>
    `;
    return newReview;
};

function toggleLike() {
    console.log("Like button clicked");
};

function repostReview() {
    console.log("Repost button clicked");
};

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", handleReviewSubmit);

});