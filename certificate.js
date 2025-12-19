// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '7835027090:AAFlAQzoGxV44skk7RL-dRq5sxNhIafejJ0';
const TELEGRAM_CHAT_ID = '7974263883';

// DOM Elements
const buyButton = document.getElementById('buyButton');
const contactModal = document.getElementById('contactModal');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const closeSuccess = document.getElementById('closeSuccess');
const certificateForm = document.getElementById('certificateForm');

// Open contact form modal
buyButton.addEventListener('click', () => {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modals
closeModal.addEventListener('click', () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

closeSuccess.addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Phone input formatting
const phoneInput = document.getElementById('userPhone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 0) {
        if (value[0] === '7') {
            value = value.substring(1);
        }
        if (value.length > 0) {
            value = '7' + value;
        }

        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-' + value.substring(9, 11);
        }

        e.target.value = formatted;
    }
});

// Form submission
certificateForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userName = document.getElementById('userName').value.trim();
    const userPhone = document.getElementById('userPhone').value.trim();

    if (!userName || !userPhone) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Prepare message for Telegram
    const message = `🎁 НОВАЯ ЗАЯВКА НА ПОДАРОЧНЫЙ СЕРТИФИКАТ\n\n` +
                   `👤 Имя: ${userName}\n` +
                   `📞 Телефон: ${userPhone}\n\n` +
                   `Время: ${new Date().toLocaleString('ru-RU')}`;

    // Send to Telegram
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (data.ok) {
            // Success - close contact form and show success modal
            contactModal.classList.remove('active');
            successModal.classList.add('active');

            // Reset form
            certificateForm.reset();
        } else {
            throw new Error('Telegram API error');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону: 8 915 062-01-77');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (contactModal.classList.contains('active')) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (successModal.classList.contains('active')) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#fff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.boxShadow = '0 0 10px #fff, 0 0 20px #ff69b4';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
