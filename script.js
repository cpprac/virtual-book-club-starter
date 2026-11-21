function loadReviews() {
    console.log("loadReviews called!");
};

function handleReviewSubmit() {
    console.log("handleReviewSubmit called!");
};

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();

    const reviewForm = document.getElementById("review-form");
    reviewForm.addEventListener("submit", handleReviewSubmit);

});