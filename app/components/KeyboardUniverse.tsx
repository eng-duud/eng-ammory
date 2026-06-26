"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
<<<<<<< HEAD
import { useTheme } from "./ThemeProvider";

/* ── colour palettes per theme ─────────────────────────────────── */
const PALETTES = {
  dark: {
    keyBody:    0x1c1c1c,
    keyTop:     0x252525,
    edgeAlpha:  0.18,
    ambient:    0x111111,
    ambientInt: 2,
    gold:       0xC9A96E,
    goldInt:    3.5,
    blue:       0x3355ee,
    blueInt:    1.8,
    rim:        0xC9A96E,
    rimInt:     1.2,
    metalness:  0.35,
    roughness:  0.55,
  },
  light: {
    keyBody:    0xd4c9b8,
    keyTop:     0xe0d5c5,
    edgeAlpha:  0.30,
    ambient:    0xddd0be,
    ambientInt: 3,
    gold:       0x8C6A32,
    goldInt:    5,
    blue:       0x4466bb,
    blueInt:    2.5,
    rim:        0x8C6A32,
    rimInt:     2.0,
    metalness:  0.15,
    roughness:  0.45,
  },
};

export default function KeyboardUniverse() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const { theme }   = useTheme();
  const themeRef    = useRef(theme);

  /* refs to Three objects so we can mutate colours on theme change */
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    gold:    THREE.PointLight;
    blue:    THREE.PointLight;
    rim:     THREE.PointLight;
  } | null>(null);
  const matsRef   = useRef<{
    body: THREE.MeshPhysicalMaterial;
    top:  THREE.MeshPhysicalMaterial;
    edge: THREE.MeshBasicMaterial;
  }[]>([]);

  /* ── live-update colours when theme flips ───────────────────── */
  useEffect(() => {
    themeRef.current = theme;
    const p = PALETTES[theme];
    if (!lightsRef.current) return;

    const { ambient, gold, blue, rim } = lightsRef.current;
    ambient.color.setHex(p.ambient);    ambient.intensity = p.ambientInt;
    gold.color.setHex(p.gold);          gold.intensity    = p.goldInt;
    blue.color.setHex(p.blue);          blue.intensity    = p.blueInt;
    rim.color.setHex(p.rim);            rim.intensity      = p.rimInt;

    matsRef.current.forEach(({ body, top, edge }) => {
      body.color.setHex(p.keyBody);
      body.metalness = p.metalness; body.roughness = p.roughness;
      top.color.setHex(p.keyTop);
      top.metalness  = p.metalness; top.roughness  = p.roughness;
      edge.opacity = p.edgeAlpha;
    });
  }, [theme]);

  /* ── build the scene once ───────────────────────────────────── */
=======

export default function KeyboardUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    keys: THREE.Group[];
    mouse: { x: number; y: number };
    scrollY: number;
    animFrameId: number;
    velocities: { x: number; y: number; z: number }[];
  } | null>(null);

>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

<<<<<<< HEAD
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
=======
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
<<<<<<< HEAD
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;

    /* ── Lights ─────────────────────────────────────────────── */
    const p0 = PALETTES[themeRef.current];

    const ambient = new THREE.AmbientLight(p0.ambient, p0.ambientInt);
    scene.add(ambient);

    const gold = new THREE.PointLight(p0.gold, p0.goldInt, 90);
    gold.position.set(12, 12, 22);
    scene.add(gold);

    const blue = new THREE.PointLight(p0.blue, p0.blueInt, 70);
    blue.position.set(-15, -10, 18);
    scene.add(blue);

    const rim = new THREE.PointLight(p0.rim, p0.rimInt, 55);
    rim.position.set(0, -18, 8);
    scene.add(rim);

    lightsRef.current = { ambient, gold, blue, rim };

    /* ── Key geometry factory ───────────────────────────────── */
    const keyLabels = [
      "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",
      "Q","R","S","T","U","V","W","X","Y","Z",
      "1","2","3","4","5","6","7","8","9","0",
      "⌘","⇧","⌥","⌃","↵","⌫","⇥","␣",
      "</>","{ }","[ ]","( )","=>","&&","||","!=",
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createKey = (_idx: number) => {
      const g = new THREE.Group();
      const p = PALETTES[themeRef.current];

      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: p.keyBody, metalness: p.metalness, roughness: p.roughness,
        transparent: true, opacity: 0.88,
      });
      const topMat = new THREE.MeshPhysicalMaterial({
        color: p.keyTop, metalness: p.metalness, roughness: p.roughness,
        transparent: true, opacity: 0.92,
      });
      const edgeMat = new THREE.MeshBasicMaterial({
        color: 0xC9A96E, transparent: true, opacity: p.edgeAlpha,
      });

      matsRef.current.push({ body: bodyMat, top: topMat, edge: edgeMat });

      const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.5), bodyMat);
      g.add(body);

      const top = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.16), topMat);
      top.position.z = 0.3;
      g.add(top);

      // Gold-edge highlight on ~40 % of keys
      if (Math.random() > 0.6) {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(2.28, 2.28, 0.54), edgeMat);
        g.add(edge);
      }

      const spread = 38, depthSpread = 22;
      g.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * depthSpread - 5,
      );
      g.rotation.set(
        Math.random() * 0.6,
        Math.random() * 0.6,
        (Math.random() - 0.5) * 0.5,
      );
      g.userData = {
        ox: g.position.x, oy: g.position.y, oz: g.position.z,
        floatOff:   Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatAmp:   0.3 + Math.random() * 0.6,
        rotSpeed:   (Math.random() - 0.5) * 0.012,
      };
      return g;
    };

    const COUNT = Math.min(58, keyLabels.length);
    const keys: THREE.Group[] = [];
    const vel: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const k = createKey(i);
      scene.add(k);
      keys.push(k);
      vel.push({ x: 0, y: 0, z: 0 });
    }

    /* ── Input state ────────────────────────────────────────── */
    const mouse = { x: 0, y: 0 };
    let scrollY = 0;
    let time    = 0;

    const explode = (cx: number, cy: number, strength = 1) => {
      const wx = (cx / window.innerWidth  - 0.5) * 44;
      const wy = -(cy / window.innerHeight - 0.5) * 34;
      keys.forEach((k, i) => {
        const dx = k.position.x - wx;
        const dy = k.position.y - wy;
        const d  = Math.sqrt(dx * dx + dy * dy);
        const f  = Math.max(0, 9 - d) * 0.55 * strength;
        vel[i].x += (dx / (d + 0.1)) * f;
        vel[i].y += (dy / (d + 0.1)) * f;
        vel[i].z += (Math.random() - 0.5) * f * 1.8;
      });
    };

    const onMouseMove  = (e: MouseEvent)     => { mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2; mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2; };
    const onClick      = (e: MouseEvent)     => explode(e.clientX, e.clientY);
    const onScroll     = ()                  => { scrollY = window.scrollY; };
    const onTouch      = (e: TouchEvent)     => { const t = e.touches[0]; if (t) explode(t.clientX, t.clientY, 0.8); };
    const onResize     = ()                  => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click",     onClick);
    window.addEventListener("scroll",    onScroll,  { passive: true });
    window.addEventListener("touchstart",onTouch,   { passive: true });
    window.addEventListener("resize",    onResize);

    /* ── Animation loop ─────────────────────────────────────── */
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.008;

      /* Camera follows mouse smoothly */
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 2.0 - camera.position.y) * 0.03;

      const scrollShift = scrollY * 0.016;

      keys.forEach((k, i) => {
        const { ox, oy, oz, floatOff, floatSpeed, floatAmp, rotSpeed } = k.userData;
        const v = vel[i];

        /* Physics damping */
        v.x *= 0.91; v.y *= 0.91; v.z *= 0.91;

        /* Floating */
        const fy = Math.sin(time * floatSpeed + floatOff) * floatAmp;
        const fx = Math.cos(time * floatSpeed * 0.7 + floatOff) * floatAmp * 0.45;

        /* Spring return */
        const sx = (ox - k.position.x) * 0.038;
        const sy = (oy - k.position.y) * 0.038;
        const sz = (oz - k.position.z) * 0.038;

        k.position.x += v.x + sx + fx * 0.012;
        k.position.y += v.y + sy + fy * 0.012 - scrollShift * (0.4 + i * 0.009);
        k.position.z += v.z + sz;

        k.rotation.x += rotSpeed * 0.45;
        k.rotation.y += rotSpeed;
        k.rotation.z += rotSpeed * 0.28;

        /* Depth-based scale (perspective feel) */
        const depth = Math.min(Math.max((k.position.z + 16) / 32, 0), 1);
        k.scale.setScalar(0.55 + depth * 0.45);
      });

      /* Light bob */
      gold.position.x = 12 + Math.sin(time * 0.4) * 4;
      gold.position.y = 12 + Math.cos(time * 0.3) * 3;

=======

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x111111, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xC9A96E, 3, 80);
    pointLight1.position.set(10, 10, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4444ff, 1.5, 60);
    pointLight2.position.set(-15, -10, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xC9A96E, 1, 50);
    pointLight3.position.set(0, -15, 10);
    scene.add(pointLight3);

    // Key labels
    const keyLabels = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
      "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
      "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
      "⌘", "⇧", "⌥", "⌃", "↵", "⌫", "⇥", "␣",
      "</>", "{ }", "[ ]", "( )", "=>", "&&", "||", "!="
    ];

    // Create 3D key geometry
    const createKey = (label: string, index: number) => {
      const group = new THREE.Group();

      // Key body
      const bodyGeo = new THREE.BoxGeometry(2.2, 2.2, 0.5);
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.6,
        transparent: true,
        opacity: 0.85,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Key top face (slightly smaller, raised)
      const topGeo = new THREE.BoxGeometry(1.8, 1.8, 0.15);
      const topMat = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.4,
        roughness: 0.4,
        transparent: true,
        opacity: 0.9,
      });
      const top = new THREE.Mesh(topGeo, topMat);
      top.position.z = 0.28;
      group.add(top);

      // Gold edge highlight (randomly on some keys)
      if (Math.random() > 0.6) {
        const edgeGeo = new THREE.BoxGeometry(2.25, 2.25, 0.52);
        const edgeMat = new THREE.MeshBasicMaterial({
          color: 0xC9A96E,
          transparent: true,
          opacity: 0.15,
          wireframe: false,
        });
        const edgeFrame = new THREE.Mesh(edgeGeo, edgeMat);
        group.add(edgeFrame);
      }

      // Random position in 3D space
      const spread = 35;
      const depthSpread = 20;
      group.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * depthSpread - 5
      );

      // Random rotation
      group.rotation.set(
        Math.random() * 0.5,
        Math.random() * 0.5,
        (Math.random() - 0.5) * 0.4
      );

      // Store original position for animations
      group.userData = {
        originalX: group.position.x,
        originalY: group.position.y,
        originalZ: group.position.z,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatAmp: 0.3 + Math.random() * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        label,
        index,
      };

      return group;
    };

    // Create keys
    const keyCount = Math.min(55, keyLabels.length);
    const keys: THREE.Group[] = [];
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < keyCount; i++) {
      const key = createKey(keyLabels[i], i);
      scene.add(key);
      keys.push(key);
      velocities.push({ x: 0, y: 0, z: 0 });
    }

    const mouse = { x: 0, y: 0 };
    let scrollY = 0;
    let time = 0;

    // Mouse move
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Click - explode keys
    const onClick = (e: MouseEvent) => {
      const clickX = (e.clientX / window.innerWidth - 0.5) * 40;
      const clickY = -(e.clientY / window.innerHeight - 0.5) * 30;

      keys.forEach((key, i) => {
        const dx = key.position.x - clickX;
        const dy = key.position.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 8 - dist) * 0.6;

        velocities[i].x += (dx / (dist + 0.1)) * force;
        velocities[i].y += (dy / (dist + 0.1)) * force;
        velocities[i].z += (Math.random() - 0.5) * force * 2;
      });
    };

    // Scroll
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    // Touch
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const clickX = (touch.clientX / window.innerWidth - 0.5) * 40;
      const clickY = -(touch.clientY / window.innerHeight - 0.5) * 30;

      keys.forEach((key, i) => {
        const dx = key.position.x - clickX;
        const dy = key.position.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 10 - dist) * 0.5;
        velocities[i].x += (dx / (dist + 0.1)) * force;
        velocities[i].y += (dy / (dist + 0.1)) * force;
        velocities[i].z += (Math.random() - 0.5) * force;
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("touchstart", onTouch);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animFrameId: number;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      time += 0.008;

      // Subtle camera parallax with mouse
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.03;

      // Scroll parallax
      const scrollOffset = scrollY * 0.015;

      keys.forEach((key, i) => {
        const ud = key.userData;
        const vel = velocities[i];

        // Apply physics
        vel.x *= 0.92;
        vel.y *= 0.92;
        vel.z *= 0.92;

        // Floating sine wave
        const floatY = Math.sin(time * ud.floatSpeed + ud.floatOffset) * ud.floatAmp;
        const floatX = Math.cos(time * ud.floatSpeed * 0.7 + ud.floatOffset) * ud.floatAmp * 0.5;

        // Spring back to original position
        const springX = (ud.originalX - key.position.x) * 0.04;
        const springY = (ud.originalY - key.position.y) * 0.04;
        const springZ = (ud.originalZ - key.position.z) * 0.04;

        key.position.x += vel.x + springX + floatX * 0.01;
        key.position.y += vel.y + springY + floatY * 0.01 - scrollOffset * (0.5 + i * 0.01);
        key.position.z += vel.z + springZ;

        // Slow rotation
        key.rotation.x += ud.rotSpeed * 0.5;
        key.rotation.y += ud.rotSpeed;
        key.rotation.z += ud.rotSpeed * 0.3;

        // Depth-based opacity/scale
        const depth = (key.position.z + 15) / 30;
        const scale = 0.6 + depth * 0.4;
        key.scale.setScalar(scale);
      });

>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
      renderer.render(scene, camera);
    };
    animate();

<<<<<<< HEAD
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("touchstart",onTouch);
      window.removeEventListener("resize",    onResize);
      matsRef.current = [];
      lightsRef.current = null;
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
=======
    sceneRef.current = { scene, camera, renderer, keys, mouse, scrollY: 0, animFrameId: 0, velocities };

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
<<<<<<< HEAD
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
=======
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
>>>>>>> b02e648661871825b90e109e7ccda5ce53cbf953
    />
  );
}
