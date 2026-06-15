/**
 * PARTH - Enterprise AI Portfolio
 * three-scene.js - Three.js setup for Neural Background
 */

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReducedMotion) return;

    /* ====================================================
       HERO BACKGROUND (Neural Network Particles)
       ==================================================== */
    const bgContainer = document.getElementById('three-bg');
    if (bgContainer) {
        const scene = new THREE.Scene();
        // Fog blends into the deep bg color
        scene.fog = new THREE.FogExp2(0x03060f, 0.001);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        bgContainer.appendChild(renderer.domElement);

        // Create Particles
        const particleCount = 250;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;
            
            velocities.push({
                x: (Math.random() - 0.5) * 0.4,
                y: (Math.random() - 0.5) * 0.4,
                z: (Math.random() - 0.5) * 0.4
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Use custom glowing material for nodes
        const material = new THREE.PointsMaterial({
            color: 0x00c8ff, // Primary Accent
            size: 2.5,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Lines connecting nodes (Simulate network)
        // Note: For true dynamic lines in three.js you need to rebuild geometry,
        // which can be expensive. We'll stick to points for a cleaner look
        // as requested ("subtle and professional").

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
            mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
        });

        function animateBg() {
            requestAnimationFrame(animateBg);

            // Update particle positions
            const positionsAttr = geometry.attributes.position;
            for (let i = 0; i < particleCount; i++) {
                positionsAttr.array[i * 3] += velocities[i].x;
                positionsAttr.array[i * 3 + 1] += velocities[i].y;
                positionsAttr.array[i * 3 + 2] += velocities[i].z;

                // Boundary check
                if (Math.abs(positionsAttr.array[i * 3]) > 600) velocities[i].x *= -1;
                if (Math.abs(positionsAttr.array[i * 3 + 1]) > 600) velocities[i].y *= -1;
                if (Math.abs(positionsAttr.array[i * 3 + 2]) > 600) velocities[i].z *= -1;
            }
            positionsAttr.needsUpdate = true;

            // Camera subtle follow mouse
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }
        animateBg();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});
