document.addEventListener("DOMContentLoaded", () => {
    
    // 1. مؤشر الماوس المخصص
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('button, .polaroid, li, .close, .secret-star, .interactive-star, .wish-card');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // 2. النجوم السحرية العائمة والرسائل المخفية
    const starsContainer = document.getElementById('stars-container');
    const toast = document.getElementById('toast-message');
    let toastTimeout;
    const messages = [
        "فخورة فيكِ.", 
        "تستحقين هذا اليوم.", 
        "هذه لحظتك، عيشيها.", 
        "كبر الحلم... ووصل.", 
        "أجمل مهندسة.",
        "ما بعد التعب إلا الفرح."
    ];

    for (let i = 0; i < 20; i++) {
        let star = document.createElement('div');
        star.innerHTML = '✦';
        star.classList.add('interactive-star');
        star.style.left = Math.random() * 100 + 'vw';
        // مدة الصعود تتراوح بين 15 و 30 ثانية لتأثير هادئ
        star.style.animationDuration = (Math.random() * 15 + 15) + 's';
        star.style.animationDelay = (Math.random() * 20) + 's';
        star.style.fontSize = (Math.random() * 10 + 10) + 'px';
        
        star.addEventListener('click', () => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            showToast(randomMsg);
            // إضافة تأثير للمؤشر عند النقر على نجمة
            cursor.classList.add('hovering');
            setTimeout(() => cursor.classList.remove('hovering'), 300);
        });

        // جعل النجوم تتفاعل مع الماوس
        star.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        star.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));

        starsContainer.appendChild(star);
    }

    function showToast(msg) {
        toast.innerText = msg;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 3. إدارة الانتقال من الشاشة الافتتاحية
    const gateway = document.getElementById('gateway');
    const startBtn = document.getElementById('startPartyBtn');
    const mainContent = document.getElementById('mainContent');
    const sideNav = document.querySelector('.side-nav');

    startBtn.addEventListener('click', () => {
        gateway.classList.add('fade-out');
        
        setTimeout(() => {
            gateway.style.display = 'none';
            mainContent.classList.remove('hidden-content');
            sideNav.classList.add('visible');
            initScrollObserver();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    });

    // 4. إدارة الموسيقى ونبض الأيقونة
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.log("تحتاج إلى تفاعل المستخدم أولاً"));
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // 5. تأثيرات الظهور عند التمرير
    function initScrollObserver() {
        const revealElements = document.querySelectorAll('.reveal');
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 6. تحديث نقاط التنقل الجانبي
    const sections = document.querySelectorAll('section:not(#gateway)');
    const navItems = document.querySelectorAll('.side-nav li');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('data-target') === current) {
                li.classList.add('active');
            }
        });
    });

    navItems.forEach(li => {
        li.addEventListener('click', () => {
            const targetId = li.getAttribute('data-target');
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 7. زر المفاجأة (Confetti effect)
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    surpriseBtn.addEventListener('click', () => {
        surpriseBtn.style.display = 'none';
        surpriseMessage.classList.add('show');
        createConfetti();
    });

    function createConfetti() {
        const container = document.getElementById('confettiContainer');
        const colors = ['#D4AF37', '#FDFBF7', '#3B0918', '#FFD700'];
        
        for (let i = 0; i < 70; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 5000);
            }, i * 40);
        }
    }

    // 8. زر الشهادة
    const certBtn = document.getElementById('certBtn');
    certBtn.addEventListener('click', () => {
        openModal('certModal');
        setTimeout(() => {
            const footer = document.getElementById('certFooter');
            footer.classList.remove('hidden-element');
            footer.classList.add('fade-in');
        }, 1000);
    });

});

// 9. دوال إدارة الـ Modals
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
    document.querySelector('.custom-cursor').classList.remove('hovering'); // إزالة حالة التمرير للمؤشر
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
};

window.openImageModal = function(element) {
    const image = element.querySelector('.photo-placeholder img');
    const captionText = element.querySelector('.caption').innerText;
    const modalImageContent = document.getElementById('modalImageContent');

    modalImageContent.innerHTML = '';

    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImage.className = 'modal-image';

    modalImageContent.appendChild(modalImage);

    document.getElementById('modalCaption').innerText = captionText;
    openModal('imageModal');
};

window.showSecretMessage = function() {
    openModal('secretModal');
};

// إغلاق الـ Modal عند النقر خارجه
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
};