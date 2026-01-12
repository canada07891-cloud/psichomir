// Gallery photos array
const photos = [
    'photo_2026-01-13_00-24-26.jpg',
    'photo_2026-01-13_00-24-28 (2).jpg',
    'photo_2026-01-13_00-24-28.jpg',
    'photo_2026-01-13_00-24-32.jpg',
    'photo_2026-01-13_00-24-33.jpg',
    'photo_2026-01-13_00-24-34.jpg',
    'photo_2026-01-13_00-24-35.jpg',
    'photo_2026-01-13_00-24-37 (2).jpg',
    'photo_2026-01-13_00-24-37.jpg',
    'photo_2026-01-13_00-24-38.jpg',
    'photo_2026-01-13_00-24-39.jpg',
    'photo_2026-01-13_00-24-40.jpg',
    'photo_2026-01-13_00-24-41 (2).jpg',
    'photo_2026-01-13_00-24-41.jpg',
    'photo_2026-01-13_00-24-42.jpg',
    'photo_2026-01-13_00-24-43.jpg',
    'photo_2026-01-13_00-24-44 (2).jpg',
    'photo_2026-01-13_00-24-44.jpg',
    'photo_2026-01-13_00-24-45.jpg',
    'photo_2026-01-13_00-24-46.jpg',
    'photo_2026-01-13_00-24-47.jpg',
    'photo_2026-01-13_00-24-48.jpg',
    'photo_2026-01-13_00-24-49 (2).jpg',
    'photo_2026-01-13_00-24-49.jpg',
    'photo_2026-01-13_00-24-50.jpg',
    'photo_2026-01-13_00-24-51.jpg',
    'photo_2026-01-13_00-24-52.jpg',
    'photo_2026-01-13_00-24-53.jpg'
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
