document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.portfolio-slider');
    const slides = document.querySelectorAll('.portfolio-slide');
    const prevBtn = document.querySelector('.portfolio-prev');
    const nextBtn = document.querySelector('.portfolio-next');
    const dotsContainer = document.querySelector('.portfolio-dots');
    
    let currentIndex = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Initialize slider
    function initSlider() {
        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Show first slide
        updateSlider();
        
        // Start auto-slide
        startAutoSlide();
    }
    
    // Update slider state
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        const dots = document.querySelectorAll('.portfolio-dots button');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetInterval();
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Start auto-slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 100) {
            // Swipe left - next slide
            nextSlide();
        } else if (touchEndX > touchStartX + 100) {
            // Swipe right - previous slide
            prevSlide();
        }
        resetInterval();
    }
    
    // Initialize the slider
    initSlider();
});