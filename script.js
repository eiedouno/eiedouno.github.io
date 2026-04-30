/* ── BORDER HIGHLIGHT LOGIC ── */
const highlightElements = document.querySelectorAll('.skill-group, .project-card, .contact-link, .stat');

window.addEventListener('mousemove', (e) => {
    highlightElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });
});

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const theNameEl  = document.getElementById('the-name');
const typedSpan  = document.getElementById('typed-span');
const introBg    = document.getElementById('intro-bg');
const introLines = document.querySelectorAll('#intro-lines .line');
const introBar   = document.getElementById('intro-bar');
const FULL       = 'eiedouno';

function showLines(i) {
    if (i >= introLines.length) { setTimeout(typeName, 1500); return; }
    introLines[i].classList.add('show');
    setTimeout(() => showLines(i + 1), 400);
}

function typeName() {
    let i = 0;
    const t = setInterval(() => {
        typedSpan.textContent += FULL[i++];
        if (i < FULL.length) return;
        clearInterval(t);
        const cursor  = theNameEl.querySelector('.typed-cursor');
        const dot     = Object.assign(document.createElement('span'), { className:'accent', textContent:'.' });
        theNameEl.insertBefore(dot, cursor);
        theNameEl.querySelector('.glitch-a').textContent = 'eiedouno.';
        theNameEl.querySelector('.glitch-b').textContent = 'eiedouno.';
        setTimeout(fillBar, 400);
    }, 72);
}

function fillBar() {
    let pct = 0;
    const t = setInterval(() => {
        pct += 3;
        introBar.style.width = Math.min(pct, 100) + '%';
        if (pct < 100) return;
        clearInterval(t);
        setTimeout(flip, 200);
    }, 10);
}

function flip() {
    window.scrollTo(0, 0);
    const from = theNameEl.getBoundingClientRect();
    const slot = document.getElementById('hero-slot');
    const to   = slot.getBoundingClientRect();

    document.getElementById('main').classList.add('ready');
    introBg.style.transition = 'opacity 0.8s ease';
    introBg.style.opacity    = '0';

    const cursor = theNameEl.querySelector('.typed-cursor');
    if (cursor) { cursor.style.transition = 'opacity 0.2s'; cursor.style.opacity = '0'; }

    const dx = to.left - from.left;
    const dy = to.top  - from.top;
    theNameEl.style.transition = 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)';
    theNameEl.style.transform  = `translate(${dx}px, ${dy}px)`;

    setTimeout(() => {
        theNameEl.style.transition = 'none';
        theNameEl.removeAttribute('style');
        theNameEl.classList.add('in-hero');
        slot.parentNode.replaceChild(theNameEl, slot);
        document.body.classList.remove('lock-scroll');
        introBg.remove();
        if (cursor) cursor.remove();
        revealHero();
    }, 1010);
}

function revealHero() {
    document.querySelector('.hero-grid-bg').classList.add('show');
    document.querySelector('.hero-glow').classList.add('show');
    document.querySelector('.hero-tag').classList.add('show');
    setTimeout(() => {
        document.querySelector('.hero-desc').classList.add('show');
        document.querySelector('.hero-cta').classList.add('show');
        document.querySelector('.hero-scroll').classList.add('show');
        document.getElementById('nav').classList.add('show');
    }, 280);
}

setTimeout(() => {
    document.body.classList.add('lock-scroll');
    showLines(0);
}, 350);

const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-clip').forEach(el => io.observe(el));
