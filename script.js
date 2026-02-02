/* * Paver World Construction 
 * Advanced JavaScript with Animations & Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect with Enhanced Styling ---
    const header = document.getElementById('header');
    let scrollProgress = 0;
    
    window.addEventListener('scroll', () => {
        scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle with Smooth Animation ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerBtn.style.transform = navLinks.classList.contains('active') 
            ? 'rotate(90deg)' 
            : 'rotate(0deg)';
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerBtn.style.transform = 'rotate(0deg)';
        });
    });

    // --- 3. Advanced Fade-in Animation on Scroll with Stagger ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => observer.observe(el));

    // --- 4. Parallax Effect on Scroll ---
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            pageHero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
        });
    }

    // --- 5. Enhanced Form Handling with Validation ---
    const quoteForm = document.getElementById('quoteForm');
    
    if(quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            // Simple validation
            if (!name.value || !phone.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Success message
            alert('Thank you, ' + name.value + '! Your request has been received. We will contact you via WhatsApp or Phone shortly.');
            quoteForm.reset();
        });
    }

    // --- 6. Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="index.html#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                e.preventDefault();
                const target = document.querySelector(href.split('#')[1]);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- 7. Card Hover Glow Effect ---
    const cards = document.querySelectorAll('.product-card, .service-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });

    // --- 8. Cursor Effect for Links ---
    const links = document.querySelectorAll('a:not(.chatbot-send):not(.chatbot-toggle):not(.chatbot-close):not(.suggestion-btn), button:not(.chatbot-send):not(.chatbot-toggle):not(.chatbot-close):not(.suggestion-btn)');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // --- 9. AI Chatbot Assistant ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotSuggestions = document.getElementById('chatbot-suggestions');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // FAQ Database
    const faqDatabase = {
        'products': {
            keywords: ['products', 'offer', 'sell', 'pavers', 'paving'],
            response: 'We offer premium paving products including:\n• Residential driveway pavers\n• Commercial grade concrete pavers\n• Decorative interlocking pavers\n• Landscape paving stones\n• Permeable pavers for drainage\nAll available in various colors and patterns. Visit our Products page for more details!'
        },
        'pricing': {
            keywords: ['price', 'cost', 'expensive', 'how much', 'quote', 'rates'],
            response: 'Our pricing depends on project size, materials, and complexity. We offer:\n• Free consultation & site visit\n• Competitive quotes within 24 hours\n• Flexible payment plans available\n• Volume discounts for large projects\nContact us for a personalized quote!'
        },
        'timeline': {
            keywords: ['how long', 'duration', 'installation', 'time', 'days', 'weeks'],
            response: 'Project timeline varies by scope:\n• Small driveway (2-3 days)\n• Medium driveway (3-5 days)\n• Large commercial projects (1-2 weeks)\n• Design consultation & prep (2-3 days)\nWe work efficiently without compromising quality. Contact us to discuss your timeline!'
        },
        'warranty': {
            keywords: ['warranty', 'guarantee', 'guarantee', 'damage', 'defect'],
            response: 'Yes! We provide comprehensive coverage:\n• 100% Quality Guarantee on all products\n• 1-year warranty on installation\n• 15-year durability rating\n• Free maintenance consultation\n• Repair/replacement for defects\nYour satisfaction is our priority!'
        },
        'location': {
            keywords: ['where', 'location', 'lilongwe', 'malawi', 'service area'],
            response: 'We proudly serve Lilongwe and surrounding areas in Malawi. We handle:\n• Residential projects\n• Commercial installations\n• Government contracts\n• Site visits and consultations available\nContact us to confirm your area!'
        },
        'contact': {
            keywords: ['contact', 'phone', 'call', 'whatsapp', 'email', 'reach'],
            response: 'Get in touch with us:\n• WhatsApp: Click the WhatsApp button\n• Phone: Available in Contact page\n• Email: Available in Contact page\n• Visit: Contact page for full details\nWe\'re happy to answer your questions!'
        },
        'installation': {
            keywords: ['install', 'installation', 'prepare', 'process', 'how'],
            response: 'Our professional installation process:\n1. Site assessment & preparation\n2. Soil leveling & compaction\n3. Sand/bedding layer placement\n4. Paver installation & alignment\n5. Joint filling & sealing\n6. Final inspection & cleanup\nOur expert team ensures perfect results!'
        },
        'services': {
            keywords: ['services', 'what do you do', 'offer'],
            response: 'Paver World Construction offers:\n• Driveway paving & repair\n• Landscape paving design\n• Commercial paving projects\n• Patio & pathway installation\n• Drainage solutions\n• Maintenance & restoration\nVisit our Services page for more!'
        }
    };

    function findResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        for (const [key, faq] of Object.entries(faqDatabase)) {
            for (const keyword of faq.keywords) {
                if (message.includes(keyword)) {
                    return faq.response;
                }
            }
        }
        
        // Default response
        return 'Thank you for your question! For more specific information, please contact us via WhatsApp or fill out our contact form. Our team is here to help!';
    }

    function toggleChatbot() {
        chatbotWidget.classList.toggle('active');
        if (chatbotWidget.classList.contains('active')) {
            chatbotInput.focus();
        }
    }

    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        const lines = text.split('\n');
        const formattedText = lines.join('<br>');
        messageDiv.innerHTML = `<p>${formattedText}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        if (isUser && chatbotSuggestions) {
            chatbotSuggestions.style.display = 'none';
        }
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = findResponse(message);
            addMessage(response, false);
        }, 300);
    }

    // Event Listeners
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            chatbotInput.value = question;
            chatbotInput.focus();
            sendMessage();
        });
    });
});

// --- Preloader hide on full load ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    // remove loading lock on body
    document.body.classList.remove('loading');
    // fade out then remove
    preloader.classList.add('preloader-hidden');
    setTimeout(() => {
        if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 700);
});