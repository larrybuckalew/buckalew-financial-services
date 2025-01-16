document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlider = document.querySelector('.testimonial-slider');

    // Testimonial Data
    const testimonials = [
        {
            quote: "Buckalew Financial transformed my financial future. Their personalized approach made all the difference.",
            name: "Robert K.",
            profession: "Engineer",
            avatar: "/images/client-robert.jpg"
        },
        {
            quote: "I never thought I could achieve early retirement, but their strategic planning made it possible.",
            name: "Emily T.",
            profession: "Teacher",
            avatar: "/images/client-emily.jpg"
        },
        {
            quote: "The debt consolidation strategy they developed helped me regain financial control.",
            name: "Michael S.",
            profession: "Sales Manager",
            avatar: "/images/client-michael.jpg"
        }
    ];

    // Testimonial Slider Functionality
    function createTestimonialElement(testimonial) {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.innerHTML = `
            <blockquote>${testimonial.quote}</blockquote>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="client-avatar">
                <div>
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.profession}</span>
                </div>
            </div>
        `;
        return testimonialElement;
    }

    function initTestimonialSlider() {
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonialSlider.innerHTML = '';
            const testimonial = testimonials[index];
            testimonialSlider.appendChild(createTestimonialElement(testimonial));
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        // Initial display
        showTestimonial(currentTestimonial);

        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);
    }

    // Testimonial Filtering (if multiple testimonial sections exist)
    function initTestimonialFilters() {
        const filterButtons = document.querySelectorAll('.testimonial-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                const filteredTestimonials = testimonials.filter(t => t.category === category);
                
                // Update testimonial display
                testimonialSlider.innerHTML = '';
                filteredTestimonials.forEach(t => {
                    testimonialSlider.appendChild(createTestimonialElement(t));
                });
            });
        });
    }

    // Video Testimonial Modal
    function initVideoTestimonials() {
        const videoTestimonialTriggers = document.querySelectorAll('.video-testimonial-trigger');
        const videoModal = document.getElementById('video-testimonial-modal');
        const videoContainer = document.getElementById('video-container');

        videoTestimonialTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const videoSrc = this.dataset.videoSrc;
                videoContainer.innerHTML = `
                    <iframe 
                        src="${videoSrc}" 
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen
                    ></iframe>
                `;
                videoModal.classList.add('open');
            });
        });

        // Close modal
        document.querySelector('.modal-close').addEventListener('click', function() {
            videoContainer.innerHTML = '';
            videoModal.classList.remove('open');
        });
    }

    // Initialize All Testimonial Features
    function initTestimonialFeatures() {
        if (testimonialSlider) {
            initTestimonialSlider();
        }

        initTestimonialFilters();
        initVideoTestimonials();
    }

    initTestimonialFeatures();
});