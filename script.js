document.addEventListener('DOMContentLoaded', () => {

    /* ═══════════════════════════════════
       Particle Canvas — Floating Stars
       ═══════════════════════════════════ */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.flickerSpeed = Math.random() * 0.02 + 0.005;
            this.flickerOffset = Math.random() * Math.PI * 2;
        }
        update(time) {
            this.x += this.speedX;
            this.y += this.speedY;
            this.currentOpacity = this.opacity + Math.sin(time * this.flickerSpeed + this.flickerOffset) * 0.15;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.currentOpacity)})`;
            ctx.fill();
        }
    }

    // Create particles
    const count = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update(time);
            p.draw();
        });
        animFrame = requestAnimationFrame(animate);
    }
    animFrame = requestAnimationFrame(animate);

    /* ═══════════════════════════════════
       Form Handling — Notify Me
       ═══════════════════════════════════ */
    const form = document.getElementById('notify-form');
    const successState = document.getElementById('success-state');
    const btn = document.getElementById('btn-notify');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('user-name').value.trim();
        const email = document.getElementById('user-email').value.trim();

        if (!name || !email) return;

        // Disable button & show loading
        btn.disabled = true;
        btn.querySelector('.btn-text').textContent = 'Submitting...';
        btn.querySelector('.btn-arrow').style.display = 'none';

        // Simulate a short network delay
        setTimeout(() => {
            console.log('📧 New subscriber:', { name, email });

            // Hide form, show success
            form.style.display = 'none';
            successState.classList.remove('hidden');
        }, 800);
    });
});
