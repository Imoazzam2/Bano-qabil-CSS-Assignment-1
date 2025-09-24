// Slider functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slides li');
    const controls = document.querySelectorAll('.flex-control-paging li a');
    const prevButton = document.querySelector('.flex-prev');
    const nextButton = document.querySelector('.flex-next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Update slider position for smooth transition
        const slider = document.querySelector('.slides');
        slider.style.transform = `translateX(-${index * 100}%)`;
        
        // Remove active class from all controls
        controls.forEach(control => {
            control.classList.remove('flex-active');
        });
        
        // Add active class to current control
        controls[index].classList.add('flex-active');
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to show previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add event listeners to control dots
    controls.forEach(control => {
        control.addEventListener('click', function (e) {
            e.preventDefault();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetInterval(); // Reset the auto-slide interval
        });
    });

    // Add event listeners to navigation arrows
    if (prevButton) {
        prevButton.addEventListener('click', function (e) {
            e.preventDefault();
            prevSlide();
            resetInterval();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function (e) {
            e.preventDefault();
            nextSlide();
            resetInterval();
        });
    }

    // Function to reset the auto-slide interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Initialize the slider
    showSlide(0);
    
    // Start auto-sliding
    slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-sliding when user hovers over slider
    const sliderContainer = document.querySelector('.flexslider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // Enhance details elements with smooth animation
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                this.style.maxHeight = this.scrollHeight + 'px';
            } else {
                this.style.maxHeight = null;
            }
        });
    });

    // Add animation to progress bars on scroll
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('progress, meter');
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.opacity = '1';
                bar.style.transform = 'scaleX(1)';
            }
        });
    }

    // Initial check for progress bars
    animateProgressBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateProgressBars);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    console.log('Virtual Museum of Chemistry website loaded successfully!');
});