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
                createReviewElement(review);
                const reviewDiv = document.createElement("div");
                reviewsList.appendChild(reviewDiv);
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
    console.log(review);
};

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", handleReviewSubmit);

});