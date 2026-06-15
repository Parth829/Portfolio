/**
 * PARTH - Enterprise AI Portfolio
 * script.js - Core UI Interactions, GSAP, Chart.js, Matrix Canvas
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- LOADER & BOOT SEQUENCE ---
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.progress-fill');
    const steps = document.querySelectorAll('.loading-steps .step');
    
    // Animate progress bar
    setTimeout(() => {
        fill.style.transition = 'width 2.2s ease-in-out';
        fill.style.width = '100%';
    }, 100);

    // Stagger loading text steps
    let maxDelay = 0;
    steps.forEach(step => {
        const delay = parseInt(step.getAttribute('data-delay'));
        if (delay > maxDelay) maxDelay = delay;
        setTimeout(() => {
            step.style.opacity = '1';
        }, delay);
    });

    // Hide loader after completion
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initAnimations(); // Start main animations after load
        }, 800);
    }, maxDelay + 800);


    // --- CUSTOM CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderCursor() {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const interactives = document.querySelectorAll('a, button, .project-card, .r-card, .cert-badge, .vp-node');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });


    // --- MATRIX RAIN CANVAS ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const terms = ["DATA", "MODEL", "SQL", "PYTHON", "CNN", "GRU", "ETL", "FORECAST", "AI", "LLM", "PIPELINE"];
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            // Translucent black background to create fade effect
            ctx.fillStyle = 'rgba(3, 6, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00c8ff'; // Primary Accent
            ctx.font = fontSize + 'px "DM Mono"';

            for (let i = 0; i < drops.length; i++) {
                const text = terms[Math.floor(Math.random() * terms.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }


    // --- MAIN INITIALIZATION (Called after boot) ---
    function initAnimations() {
        initTyped();
        initGSAP();
    }

    // --- TYPED.JS ---
    function initTyped() {
        const typedText = document.getElementById('typed-text');
        if(typedText) {
            new Typed('#typed-text', {
                strings: [
                    "Building Intelligent Systems...",
                    "Analyzing Complex Data...",
                    "Predicting Future Trends...",
                    "Generating AI Insights...",
                    "Deploying Data Solutions..."
                ],
                typeSpeed: 40,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                cursorChar: '_',
                autoInsertCss: true
            });
        }
    }


    // --- GSAP & SCROLLTRIGGER ---
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);

        // Integer Counters
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let proxy = { val: 0 };
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 95%", // Trigger almost immediately when in view
                once: true,
                onEnter: () => {
                    gsap.to(proxy, {
                        val: target,
                        duration: 2.5,
                        ease: "power3.out",
                        onUpdate: () => {
                            counter.innerHTML = Math.floor(proxy.val);
                        }
                    });
                }
            });
        });

        // Skill Bars
        const skillBars = document.querySelectorAll('.skill-bar .fill');
        skillBars.forEach(bar => {
            ScrollTrigger.create({
                trigger: bar,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    bar.style.width = bar.getAttribute('data-width');
                }
            });
        });

        // Fade in elements
        gsap.utils.toArray('.section-title, .dash-card, .r-card, .timeline-item').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        // Removed GSAP from .arch-node and .arch-terminal to prevent conflicts with CSS animations.
    }



});
