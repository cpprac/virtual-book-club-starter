function loadReviews() {
    fetch("reviews.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(reviews => {
            console.log(reviews);
        })
        .catch(error => {
            console.error("There was a problem:", error);
        })
};

function handleReviewSubmit() {
    console.log("handleReviewSubmit called!");
};

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", handleReviewSubmit);

});