import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';

const App = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0); // Set background to transparent
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xF5E8C7, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xD4A017, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Load 3D Model
        const loader = new GLTFLoader();
        loader.load(
            `${process.env.PUBLIC_URL}/models/base_basic_shaded.glb`, // Replace with your model file
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);
                model.position.set(0, 0, 0);
                model.scale.set(2, 2, 2); // Adjust scale to make it twice as big
            },
            undefined,
            (error) => console.error('Error loading model:', error)
        );

        // Camera position
        camera.position.z = 5;

        // Orbit controls (rotate with mouse)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Responsive resize
        const handleResize = () => {
            camera.aspect = container.offsetWidth / container.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div className="app">
            <nav className="navbar">
                <div className="logo">MACHINA</div>
                <ul className="nav-links">
                    <li><button className="nav-button">Home</button></li>
                    <li><button className="nav-button">Experience</button></li>
                    <li><button className="nav-button">Contact</button></li>
                </ul>
            </nav>
            <section className="hero">
                <video autoPlay muted loop className="hero-video">
                    <source src={`${process.env.PUBLIC_URL}/images/australia.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-content">
                    <h1>Mach-E Machina</h1>
                    <p>Redefine Velocity</p>
                    <blockquote className="hero-quote">
                        <strong>Luxury without limits, ruggedness without compromise—Machina redefines the wild with zero-emission might.</strong>
                    </blockquote>
                    <button className="discover-btn" onClick={() => document.getElementById('mache-image').scrollIntoView({ behavior: 'smooth' })}>Discover</button>
                </div>
            </section>
            <section id="mache-image" className="half-screen-image">
                <blockquote className="image-quote-left">
                    <strong>Luxury without limits, ruggedness without compromise—Machina redefines the wild with zero-emission might.</strong>
                </blockquote>
                <img src={`${process.env.PUBLIC_URL}/images/mache.png`} alt="Machina Full View" className="half-image" />
                <blockquote className="image-quote-right">
                    <strong>Faster than a Urus, Battery Range 30% longer life than Lucid, starting at 90K, our ultra luxurious Mach-E Machina will fulfill all your desires and then some.</strong>
                </blockquote>
            </section>
            <section className="model-section">
                <div id="model-container" ref={containerRef} className="model-3d"></div>
            </section>
            <section className="video-section">
                <video autoPlay muted loop className="side-video">
                    <source src={`${process.env.PUBLIC_URL}/images/648400757847749.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </section>
        </div>
    );
};

export default App;