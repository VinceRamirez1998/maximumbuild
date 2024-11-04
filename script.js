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
const rightArrow2 = document.querySelector('.reviews-carousel .right');
const leftArrow2 = document.querySelector('.reviews-carousel .left');

function showReviews() {
    const offset = -currentIndex2 * 100; 
    document.querySelector('.reviews-images').style.transform = `translateX(${offset}%)`;

    items2.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex2);
    });

    leftArrow2.disabled = currentIndex2 === 0;
    rightArrow2.disabled = currentIndex2 >= totalItems2 - 1;
}

rightArrow2.addEventListener('click', () => {
    if (currentIndex2 < totalItems2 - 1) {
        currentIndex2++;
    } else {
        currentIndex2 = 0; // Loop back to the first review
    }
    showReviews();
});

leftArrow2.addEventListener('click', () => {
    if (currentIndex2 > 0) {
        currentIndex2--;
    } else {
        currentIndex2 = totalItems2 - 1; // Loop to the last review
    }
    showReviews();
});

// Initial display setup
showReviews();
