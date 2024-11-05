let currentIndex = 0; // Start at the first set of images
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const itemsPerSlide = 3; // Number of items to display at once
const rightArrow = document.querySelector('.right');
const leftArrow = document.querySelector('.left');

// Function to show only the required images
function showItems() {
    // Calculate the offset for sliding based on the current index
    const offset = -currentIndex * (100 / itemsPerSlide); 
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    
    // Manage active classes for opacity transition
    items.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + itemsPerSlide) {
            item.classList.add('active'); // Add active class to show item
        } else {
            item.classList.remove('active'); // Remove active class to hide item
        }
    });

    // Update arrow state
    leftArrow.disabled = currentIndex === 0;
    rightArrow.disabled = currentIndex >= totalItems - itemsPerSlide;
}

// Right arrow click event
rightArrow.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsPerSlide) {
        currentIndex += itemsPerSlide; // Move to the next set of images
        showItems();
    }
});

// Left arrow click event
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex -= itemsPerSlide; // Move to the previous set of images
        showItems();
    }
});

// Initial display setup
showItems();




// Reviews Carousel
// Reviews Carousel
let currentIndex2 = 0;
const items2 = document.querySelectorAll('.review-item');
const totalItems2 = items2.length;
const reviewsContainer = document.querySelector('.reviews-images');

const rightArrow2 = document.querySelector('.reviews-carousel .right');
const leftArrow2 = document.querySelector('.reviews-carousel .left');

// Function to update the carousel's position
function showReviews() {
    // Determine how far the carousel should slide (600px for desktop, 300px for mobile)
    const slideDistance = window.innerWidth <= 768 ? 390 : 600;

    // Calculate the offset based on the current index
    const offset = -currentIndex2 * slideDistance;

    // Apply the transform to move the carousel
    reviewsContainer.style.transform = `translateX(${offset}px)`;

    // Disable arrows when reaching the first or last group
    leftArrow2.disabled = currentIndex2 === 0;
    rightArrow2.disabled = currentIndex2 === Math.floor(totalItems2 / (window.innerWidth <= 768 ? 1 : 3)) - 1;
}

// Right arrow functionality: Slide to the next group of items
rightArrow2.addEventListener('click', () => {
    const slideDistance = window.innerWidth <= 768 ? 390 : 600;

    // If we're not at the end, move to the next index, otherwise loop back
    if (currentIndex2 < Math.floor(totalItems2 / (window.innerWidth <= 768 ? 1 : 3))) {
        currentIndex2++;
    } else {
        currentIndex2 = 0; // Loop back to the first group
    }

    // Update the carousel position
    showReviews();
});

// Left arrow functionality: Slide to the previous group of items
leftArrow2.addEventListener('click', () => {
    const slideDistance = window.innerWidth <= 768 ? 390 : 600;

    // If we're not at the beginning, move to the previous index, otherwise loop back
    if (currentIndex2 > 0) {
        currentIndex2--;
    } else {
        currentIndex2 = Math.floor(totalItems2 / (window.innerWidth <= 768 ? 1 : 3)) - 1; // Loop back to the last group
    }

    // Update the carousel position
    showReviews();
});

// Function to handle responsive design changes (on window resize)
function updateItemsPerPage() {
    showReviews(); // Recalculate carousel positioning on resize
}

// Initial display setup
showReviews();

// Adjust items per page based on the window width on initial load and resize
window.addEventListener('resize', updateItemsPerPage);
updateItemsPerPage(); // Make sure the initial setup is correct
