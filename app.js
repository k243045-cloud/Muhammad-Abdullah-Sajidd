// Dynamic Slider Content Data (Simulated JSON Database)
const slideData = [
    {
        id: 1,
        title: "AI-Driven Predictive Analytics",
        description: "Harnessing deep learning architectures to optimize conversion tracking and consumer data pipelines.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
        ctaText: "View Project",
        ctaLink: "#"
    },
    {
        id: 2,
        title: "Next-Gen Web Applications",
        description: "Building blazing fast, accessible, and responsive user experiences using modern front-end architectures.",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1920&q=80",
        ctaText: "Explore Services",
        ctaLink: "#"
    },
    {
        id: 3,
        title: "Cloud Infrastructure & Scale",
        description: "Secure, automated deployment pipelines ensuring 99.9% uptime for enterprise-grade tools.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80",
        ctaText: "Read Case Study",
        ctaLink: "#"
    }
];

// DOM Selectors
const sliderContainer = document.getElementById('slider-container');
const indicatorsContainer = document.getElementById('indicators-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSlideIndex = 0;
let slideInterval;
const ROTATION_SPEED = 5000; // 5 seconds

// Initialize Slider Components Dynamically
function initSlider() {
    slideData.forEach((slide, index) => {
        // 1. Create and append slide DOM element
        const slideEl = document.createElement('div');
        slideEl.className = `slide flex items-center justify-center ${index === 0 ? 'active' : ''}`;
        slideEl.setAttribute('role', 'group');
        slideEl.setAttribute('aria-roledescription', 'slide');
        slideEl.setAttribute('aria-label', `${index + 1} of ${slideData.length}`);
        
        slideEl.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
            <img src="${slide.image}" alt="${slide.title}" class="absolute inset-0 w-full h-full object-cover">
            
            <div class="relative z-30 max-w-7xl mx-auto px-6 w-full text-left">
                <div class="max-w-2xl">
                    <h1 class="animate-text animate-text-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-white">
                        ${slide.title}
                    </h1>
                    <p class="animate-text animate-text-desc text-lg sm:text-xl text-gray-300 mb-8 font-light leading-relaxed">
                        ${slide.description}
                    </p>
                    <div class="animate-text animate-text-btn">
                        <a href="${slide.ctaLink}" class="inline-block bg-teal-500 hover:bg-teal-400 active:scale-95 text-gray-900 font-bold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-200">
                            ${slide.ctaText}
                        </a>
                    </div>
                </div>
            </div>
        `;
        sliderContainer.appendChild(slideEl);

        // 2. Create and append matching indicator dot
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 ${index === 0 ? 'bg-teal-400 w-8' : 'bg-gray-500 hover:bg-gray-400'}`;
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
        indicatorsContainer.appendChild(dot);
    });

    startAutoplay();
}

// State Manager: Core Navigation Engine
function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = indicatorsContainer.children;

    // Handle index wrap-around boundary cases
    if (index >= slideData.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slideData.length - 1;
    else currentSlideIndex = index;

    // Update visibility and aria values across all slides
    slides.forEach((slide, idx) => {
        if (idx === currentSlideIndex) {
            slide.classList.add('active');
            dots[idx].classList.remove('bg-gray-500', 'w-3');
            dots[idx].classList.add('bg-teal-400', 'w-8');
            dots[idx].setAttribute('aria-selected', 'true');
        } else {
            slide.classList.remove('active');
            dots[idx].classList.remove('bg-teal-400', 'w-8');
            dots[idx].classList.add('bg-gray-500', 'w-3');
            dots[idx].setAttribute('aria-selected', 'false');
        }
    });
}

// Interval Management (Autoplay Engine)
function startAutoplay() {
    slideInterval = setInterval(() => {
        goToSlide(currentSlideIndex + 1);
    }, ROTATION_SPEED);
}

function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
}

// Event Listeners for Manual Controls
nextBtn.addEventListener('click', () => {
    goToSlide(currentSlideIndex + 1);
    resetAutoplay();
});

prevBtn.addEventListener('click', () => {
    goToSlide(currentSlideIndex - 1);
    resetAutoplay();
});

// Keyboard Navigation Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
        resetAutoplay();
    } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
        resetAutoplay();
    }
});

// Kickstart execution upon DOM content load
document.addEventListener('DOMContentLoaded', initSlider);