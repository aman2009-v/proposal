// common scripts for all pages

window.addEventListener('DOMContentLoaded', () => {
    playMusic();
    startHeartAnimation();
    // repeat every few seconds without stacking intervals
    heartInterval = setInterval(startHeartAnimation, 5000);
    initPage();
});

function playMusic() {
    const audio = document.getElementById('bg-music');
    if (audio) {
        audio.play().catch(() => { /* user interaction required */ });
    }
}

function initPage() {
    const path = window.location.pathname.split('/').pop();
    // text segments used across pages
    const messagePart1 = ".\n\nThe moment I laid eyes on you on that faithful day, that day where we were receiving our badges in the academic excellence ceremony.\n\nI made one of the best choices of my life when I initiated a conversation between us.\n\n";
    const messagePart2 = "and I wish from my heart that this relationship lasts forever. I will take good care of you, and please take care of me too.\n\nIf I make any mistakes, please correct me.\n\nLOVE YOU ❤️\n";

    if (path === 'story.html') {
        typeText('storyText',
            "A small thing for the person who stole my heart..\nDuring badges ceremony\n.\n");
    }
    if (path === 'message.html') {
        typeText('messageText', messagePart1);
    }
    if (path === 'ask.html') {
        typeText('extraText', messagePart2);
    }
    if (path === 'question.html') {
        const noBtn = document.getElementById('noBtn');
        noBtn.addEventListener('mouseover', moveButton);
        document.getElementById('yesBtn').addEventListener('click', () => {
            window.location.href = 'yes.html';
        });
    }
    if (path === 'yes.html') {
        launchConfetti();
    }
}

function typeText(elementId, text) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let i = 0;
    el.textContent = '';    
    const speed = 40;
    const timer = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(timer);
    }, speed);
}

function moveButton() {
    const btn = document.getElementById('noBtn');
    const parent = btn.parentElement;
    const w = parent.offsetWidth - btn.offsetWidth;
    const h = parent.offsetHeight - btn.offsetHeight;
    const x = Math.random() * w;
    const y = Math.random() * h;
    btn.style.position = 'relative';
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

// simple confetti
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = [];
    const colors = ['#ff6b81', '#ff9a9e', '#a18cd1', '#fff'];
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            c: colors[Math.floor(Math.random() * colors.length)],
            d: Math.random() * 2 + 1
        });
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.fillStyle = p.c;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.y += p.d;
            if (p.y > canvas.height) p.y = -10;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// floating hearts
function startHeartAnimation() {
    const count = 8; // fewer hearts for readability
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (5 + Math.random() * 5) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }
}

// schedule periodic heart bursts instead of nesting intervals
let heartInterval;

