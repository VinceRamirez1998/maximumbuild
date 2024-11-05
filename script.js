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
let currentIndex2 = 0;
const items2 = document.querySelectorAll('.review-item');
const totalItems2 = items2.length;
const itemsPerPage = 3; // We want to display 3 items at a time
const totalGroups = Math.ceil(totalItems2 / itemsPerPage); // Calculate the total number of groups of 3 items

const rightArrow2 = document.querySelector('.reviews-carousel .right');
const leftArrow2 = document.querySelector('.reviews-carousel .left');

// Function to update the carousel
function showReviews() {
    const offset = -currentIndex2 * (100 / totalGroups); // Calculate the offset to slide by 100% per group of 3
    document.querySelector('.reviews-images').style.transform = `translateX(${offset}%)`;

    // Disable arrows when reaching the first or last group
    leftArrow2.disabled = currentIndex2 === 0;
    rightArrow2.disabled = currentIndex2 === totalGroups - 1;
}

// Right arrow functionality: Slide to the next group of 3 items
rightArrow2.addEventListener('click', () => {
    if (currentIndex2 < totalGroups - 1) {
        currentIndex2++;
    } else {
        currentIndex2 = 0; // Loop back to the first group
    }
    showReviews();
});

// Left arrow functionality: Slide to the previous group of 3 items
leftArrow2.addEventListener('click', () => {
    if (currentIndex2 > 0) {
        currentIndex2--;
    } else {
        currentIndex2 = totalGroups - 1; // Loop back to the last group
    }
    showReviews();
});

// Initial display setup
showReviews();

const scrollUpButton = document.querySelector('.scroll-up-arrow');

// Show or hide the scroll-up button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // When scrolled more than 300px
        scrollUpButton.style.display = 'block'; // Show button
    } else {
        scrollUpButton.style.display = 'none'; // Hide button
    }
});

// Scroll to the top when the button is clicked
scrollUpButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
});
