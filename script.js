let slideIndex = 0;
let slideInterval; // Variable to hold the slideshow interval

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }    
    slides[slideIndex - 1].style.display = "block";  
}

// Function to change slides on arrow click
function plusSlides(n) {
    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1; }    
    if (slideIndex < 1) { slideIndex = slides.length; }  
    showSlides();
    resetInterval(); // Reset the interval on manual slide change
}

// Function to reset the automatic slideshow interval
function resetInterval() {
    clearInterval(slideInterval); // Clear the existing interval
    slideInterval = setInterval(showSlides, 500); // Restart automatic slideshow every 3 seconds
}

// Start the automatic slideshow with a 3-second interval
slideInterval = setInterval(showSlides, 500); // Change image every 3 seconds

// Initial call to show the first slide
showSlides();
