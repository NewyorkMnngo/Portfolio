/* ═══════════════════════════════
   TOSS-STYLE PORTFOLIO SCRIPT
═══════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);


/* ───────────────────
   Header scroll
─────────────────── */
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', scrollY > 40);
}, { passive: true });


/* ───────────────────
   큐브 SVG — 마우스 Parallax
─────────────────── */
const hero = document.getElementById('hero');

const cubeGroups = [
    { els: [...document.querySelectorAll('.cube.c1')], speed: 0.014 },
    { els: [...document.querySelectorAll('.cube.c2')], speed: 0.026 },
    { els: [...document.querySelectorAll('.cube.c3')], speed: 0.045 },
];

hero.addEventListener('mousemove', e => {
    const ox = e.clientX - innerWidth / 2;
    const oy = e.clientY - innerHeight / 2;

    cubeGroups.forEach(({ els, speed }) => {
        els.forEach((el, i) => {
            const d = i % 2 === 0 ? 1 : -1;
            gsap.to(el, {
                x: ox * speed * d,
                y: oy * speed * d,
                duration: 0.9,
                ease: 'power2.out',
            });
        });
    });
});

hero.addEventListener('mouseleave', () => {
    cubeGroups.forEach(({ els }) => {
        els.forEach(el => gsap.to(el, { x: 0, y: 0, duration: 1.4, ease: 'power3.out' }));
    });
});

/* Idle floating */
document.querySelectorAll('.cube.c1').forEach((el, i) => {
    gsap.to(el, {
        y: '+=20', x: `+=${8 * (i % 2 ? 1 : -1)}`,
        duration: 5 + i * 0.6, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: i * 0.3,
    });
});

document.querySelectorAll('.cube.c2').forEach((el, i) => {
    gsap.to(el, {
        y: '+=14', rotation: `+=${10 * (i % 2 ? 1 : -1)}`,
        transformOrigin: 'center center',
        duration: 6 + i * 0.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: i * 0.4,
    });
});

document.querySelectorAll('.cube.c3').forEach((el, i) => {
    gsap.to(el, {
        y: `+=${10 + i * 3}`, x: `+=${5 * (i % 2 ? 1 : -1)}`,
        duration: 3 + i * 0.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: i * 0.25,
    });
});


/* ───────────────────
   Hero 진입 애니메이션
─────────────────── */
gsap.timeline({ delay: 0.2 })
    .to('.hero-label',  { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
    .to('.tl',          { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }, '-=0.15')
    .to('.hero-desc',   { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.2')
    .to('.hero-btns',   { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.15')
    .to('.scroll-hint', { opacity: 1,        duration: 0.7 }, '-=0.1');


/* ───────────────────
   카드 섹션 스크롤 등장
─────────────────── */
document.querySelectorAll('.card-section').forEach(card => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 82%',
        },
    });
});


/* ───────────────────
   스탯 카운터
─────────────────── */
document.querySelectorAll('.sc-num').forEach(el => {
    const target = +el.dataset.target;
    ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
            gsap.to({ v: 0 }, {
                v: target,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate() { el.textContent = Math.round(this.targets()[0].v); },
            });
        },
    });
});


/* ───────────────────
   스킬 카드 stagger
─────────────────── */
gsap.to('.sk-card', {
    opacity: 1,
    y: 0,
    duration: 0.55,
    stagger: 0.09,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
});

document.querySelectorAll('.sk-fill').forEach(bar => {
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 92%',
        once: true,
        onEnter: () => { bar.style.width = bar.dataset.width + '%'; },
    });
});


/* ───────────────────
   프로젝트 카드 stagger
─────────────────── */
gsap.to('.proj-card', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.13,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.proj-grid', start: 'top 82%' },
});


/* ───────────────────
   Nav active link
─────────────────── */
const navLinks = document.querySelectorAll('nav ul li a');

new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`nav a[href="#${e.target.id}"]`);
        if (active) active.style.color = '#4f7cff';
    });
}, { rootMargin: '-45% 0px -45% 0px' })
.observe.apply(null, [...document.querySelectorAll('section[id]')].map(s => [s]));

// 개별 observe
document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            navLinks.forEach(a => a.style.color = '');
            const a = document.querySelector(`nav a[href="#${s.id}"]`);
            if (a) a.style.color = '#4f7cff';
        }
    }, { rootMargin: '-45% 0px -45% 0px' }).observe(s);
});


/* ───────────────────
   Contact form
─────────────────── */
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const orig = btn.textContent;
    btn.textContent = '✓ 전송됨!';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = orig; btn.style.background = ''; e.target.reset(); }, 2500);
});
