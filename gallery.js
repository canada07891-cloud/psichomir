// Gallery photos array
const photos = [
    'WhatsApp Image 2025-12-19 at 19.03.16 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.16.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.17 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.17.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.18 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.18.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.19 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.19.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.20 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.20.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.21 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.21.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.22 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.23 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.23.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.24 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.24.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.25 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.25.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.26 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.26.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.27 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.27.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.28.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.29 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.29.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.30 (1).jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.30.jpeg',
    'WhatsApp Image 2025-12-19 at 19.03.31.jpeg',
    'WhatsApp Image 2025-12-19 at 19.12.34.jpeg'
];

let currentImageIndex = 0;

// DOM elements
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageCounter = document.getElementById('imageCounter');

// Load gallery images
function loadGallery() {
    photos.forEach((photo, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="images/gallery/${photo}" alt="День открытых дверей ${index + 1}" loading="lazy">`;
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Update lightbox image
function updateLightboxImage() {
    lightboxImage.src = `images/gallery/${photos[currentImageIndex]}`;
    imageCounter.textContent = `${currentImageIndex + 1} / ${photos.length}`;
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + photos.length) % photos.length;
    updateLightboxImage();
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % photos.length;
    updateLightboxImage();
}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Touch support for mobile swipe
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // Swipe left
        } else {
            prevImage(); // Swipe right
        }
    }
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', loadGallery);
