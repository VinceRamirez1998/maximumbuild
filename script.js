let currentIndex = 0; // Start at the first set of images
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const rightArrow = document.querySelector('.right');
const leftArrow = document.querySelector('.left');

// Function to calculate how many items should be displayed
function getItemsPerSlide() {
    if (window.innerWidth <= 768) {
        return 1; // 1 item for mobile
    }
    return 3; // 3 items for desktop
}

// Function to show only the required images
function showItems() {
    const itemsPerSlide = getItemsPerSlide(); // Get number of items to display at once
    const offset = -currentIndex * (100 / itemsPerSlide); // Calculate the offset for sliding based on the current index
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
    const itemsPerSlide = getItemsPerSlide(); // Get number of items to display at once
    if (currentIndex < totalItems - itemsPerSlide) {
        currentIndex += itemsPerSlide; // Move to the next set of images
        showItems();
    }
});

// Left arrow click event
leftArrow.addEventListener('click', () => {
    const itemsPerSlide = getItemsPerSlide(); // Get number of items to display at once
    if (currentIndex > 0) {
        currentIndex -= itemsPerSlide; // Move to the previous set of images
        showItems();
    }
});

// Initial display setup
showItems();

// Handle resize to adjust items per slide dynamically
window.addEventListener('resize', showItems); // Recalculate items per slide and update display on resize






// Reviews Carousel
let currentIndex2 = 0;
const reviewsContainer = document.querySelector('.reviews-images');
const rightArrow2 = document.querySelector('.reviews-carousel .right');
const leftArrow2 = document.querySelector('.reviews-carousel .left');

// Function to update the carousel's position and control visibility of arrows
function showReviews() {
    const items2 = document.querySelectorAll('.review-item');
    const totalItems2 = items2.length;
    const itemsPerSlide = window.innerWidth <= 768 ? 1 : 3;  // 1 item per slide on mobile, 3 on desktop
    const slideDistance = items2[0] ? items2[0].offsetWidth + 20 : 0;  // Width of each item plus a gap

    // Disable arrows if no items are available in the carousel
    if (totalItems2 === 0) {
        leftArrow2.disabled = true;
        rightArrow2.disabled = true;
        return;
    }

    // Calculate the offset based on the current index
    const offset = -(currentIndex2 * slideDistance);
    reviewsContainer.style.transform = `translateX(${offset}px)`; // Move the carousel

    // Disable arrows when reaching the first or last group of items
    leftArrow2.disabled = currentIndex2 === 0;
    rightArrow2.disabled = currentIndex2 >= Math.ceil(totalItems2 / itemsPerSlide) - 1;
}

// Right arrow functionality: Slide to the next group of items
rightArrow2.addEventListener('click', () => {
    const items2 = document.querySelectorAll('.review-item');
    const totalItems2 = items2.length;
    const itemsPerSlide = window.innerWidth <= 768 ? 1 : 3;

    // If we're not at the end, move to the next index
    if (currentIndex2 < Math.ceil(totalItems2 / itemsPerSlide) - 1) {
        currentIndex2++;
    } else {
        currentIndex2 = 0; // Loop back to the first group
    }

    // Update the carousel position
    showReviews();
});

// Left arrow functionality: Slide to the previous group of items
leftArrow2.addEventListener('click', () => {
    const items2 = document.querySelectorAll('.review-item');
    const totalItems2 = items2.length;
    const itemsPerSlide = window.innerWidth <= 768 ? 1 : 3;

    // If we're not at the beginning, move to the previous index
    if (currentIndex2 > 0) {
        currentIndex2--;
    } else {
        currentIndex2 = Math.ceil(totalItems2 / itemsPerSlide) - 1; // Loop back to the last group
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
updateItemsPerPage(); // Ensure the initial setup is correct



// SCROLL UP FUNCTION 
// Get the button element
const scrollUpButton = document.querySelector('.scroll-up-arrow');

// Function to handle scroll event
function handleScroll() {
    // Check if we're near the bottom of the page
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // If we are near the bottom of the page, show the button
    if (scrollPosition >= documentHeight - 100) {  // 100px from the bottom
        scrollUpButton.style.display = 'block';
    } else {
        scrollUpButton.style.display = 'none';
    }
}

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Smooth scroll effect
    });
}

// Attach event listener to window scroll
window.addEventListener('scroll', handleScroll);

// Add click event to scroll up button
scrollUpButton.addEventListener('click', scrollToTop);

// Initially run the scroll function in case page is already scrolled
handleScroll();
