/* ===========================
   Portfolio — GSAP Animations
   =========================== */

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────
   1. HEADER scroll style
─────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


/* ───────────────────────────
   2. HERO — SVG 인터랙션
   마우스 움직임에 따라 레이어별 parallax
─────────────────────────── */
const heroSection = document.getElementById('hero');
const layers = [
    { els: document.querySelectorAll('#hero-svg .s1'), factor: 0.012 },
    { els: document.querySelectorAll('#hero-svg .s2'), factor: 0.025 },
    { els: document.querySelectorAll('#hero-svg .s3'), factor: 0.045 },
];

heroSection.addEventListener('mousemove', (e) => {
    const { clientWidth: W, clientHeight: H } = heroSection;
    const cx = e.clientX - W / 2;
    const cy = e.clientY - H / 2;

    layers.forEach(({ els, factor }) => {
        els.forEach((el, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            gsap.to(el, {
                x: cx * factor * dir,
                y: cy * factor * dir,
                duration: 0.8,
                ease: 'power2.out',
            });
        });
    });
});

heroSection.addEventListener('mouseleave', () => {
    layers.forEach(({ els }) => {
        els.forEach(el => {
            gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: 'power3.out' });
        });
    });
});

/* SVG 도형 플로팅 idle 애니메이션 */
document.querySelectorAll('#hero-svg .s1').forEach((el, i) => {
    gsap.to(el, {
        y: '+=18',
        x: `+=${6 * (i % 2 === 0 ? 1 : -1)}`,
        duration: 4 + i * 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
    });
});

document.querySelectorAll('#hero-svg .s2').forEach((el, i) => {
    gsap.to(el, {
        y: '+=12',
        rotation: `+=${15 * (i % 2 === 0 ? 1 : -1)}`,
        transformOrigin: 'center center',
        duration: 5 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
    });
});

document.querySelectorAll('#hero-svg .dot').forEach((el, i) => {
    gsap.to(el, {
        y: `+=${8 + i * 2}`,
        x: `+=${4 * (i % 2 === 0 ? 1 : -1)}`,
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
    });
});


/* ───────────────────────────
   3. HERO 진입 애니메이션
─────────────────────────── */
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
    .to('.hero-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    .to('.title-line', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
    }, '-=0.2')
    .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    .to('.hero-btns', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    .to('.scroll-indicator', { opacity: 1, duration: 0.8 }, '-=0.1');


/* ───────────────────────────
   4. ABOUT 스크롤 애니메이션
─────────────────────────── */
gsap.to('#about .section-header', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#about',
        start: 'top 75%',
    },
});

gsap.to('#about .about-grid', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#about .about-grid',
        start: 'top 80%',
    },
});

// 숫자 카운터
document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to({ val: 0 }, {
                val: target,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate() {
                    el.textContent = Math.round(this.targets()[0].val);
                },
            });
        },
    });
});


/* ───────────────────────────
   5. SKILLS 스크롤 애니메이션
─────────────────────────── */
gsap.to('#skills .section-header', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#skills',
        start: 'top 75%',
    },
});

gsap.to('.skill-card', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
    },
});

// 스킬바 채우기
document.querySelectorAll('.skill-fill').forEach(bar => {
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        once: true,
        onEnter: () => {
            bar.style.width = bar.dataset.width + '%';
        },
    });
});


/* ───────────────────────────
   6. PROJECTS 스크롤 애니메이션
─────────────────────────── */
gsap.to('#projects .section-header', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#projects',
        start: 'top 75%',
    },
});

gsap.to('.project-card', {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
    },
});


/* ───────────────────────────
   7. CONTACT 스크롤 애니메이션
─────────────────────────── */
gsap.to('#contact .section-header', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
    },
});

gsap.to('.contact-wrap', {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.contact-wrap',
        start: 'top 80%',
    },
});


/* ───────────────────────────
   8. 네비 active 링크 하이라이트
─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

const observerOpts = { rootMargin: '-45% 0px -45% 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => a.style.color = '');
            const link = document.querySelector(`nav a[href="#${e.target.id}"]`);
            if (link) link.style.color = '#e94560';
        }
    });
}, observerOpts);

sections.forEach(s => observer.observe(s));


/* ───────────────────────────
   9. Contact form 제출
─────────────────────────── */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.textContent;
    btn.textContent = '✓ 전송됨!';
    btn.style.background = '#2ecc71';
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        e.target.reset();
    }, 2500);
});
