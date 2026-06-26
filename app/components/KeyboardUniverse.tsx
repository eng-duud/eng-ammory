"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
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
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      alpha: true, 
      antialias: false, // Disabled antialias for performance
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1); // Locked pixel ratio to 1 for performance
    renderer.setClearColor(0x000000, 0);
    
    // Performance optimization: disable shadow map
    renderer.shadowMap.enabled = false;

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
    ];

    const createKey = () => {
      const g = new THREE.Group();
      const p = PALETTES[themeRef.current];

      // Using StandardMaterial instead of PhysicalMaterial for performance
      const bodyMat = new THREE.MeshStandardMaterial({
        color: p.keyBody, metalness: p.metalness, roughness: p.roughness,
        transparent: true, opacity: 0.88,
      });
      const topMat = new THREE.MeshStandardMaterial({
        color: p.keyTop, metalness: p.metalness, roughness: p.roughness,
        transparent: true, opacity: 0.92,
      });
      const edgeMat = new THREE.MeshBasicMaterial({
        color: 0xC9A96E, transparent: true, opacity: p.edgeAlpha,
      });

      // @ts-ignore - mapping materials for theme updates
      matsRef.current.push({ body: bodyMat, top: topMat, edge: edgeMat });

      const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.5), bodyMat);
      g.add(body);

      const top = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 0.16), topMat);
      top.position.z = 0.3;
      g.add(top);

      if (Math.random() > 0.7) { // Reduced edge frequency
        const edge = new THREE.Mesh(new THREE.BoxGeometry(2.28, 2.28, 0.54), edgeMat);
        g.add(edge);
      }

      const spread = 40, depthSpread = 20;
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

    const COUNT = 35; // Reduced from 58 to 35 for performance
    const keys: THREE.Group[] = [];
    const vel: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const k = createKey();
      scene.add(k);
      keys.push(k);
      vel.push({ x: 0, y: 0, z: 0 });
    }

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

    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.008;

      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 2.0 - camera.position.y) * 0.03;

      const scrollShift = scrollY * 0.016;

      keys.forEach((k, i) => {
        const { ox, oy, oz, floatOff, floatSpeed, floatAmp, rotSpeed } = k.userData;
        const v = vel[i];

        v.x *= 0.91; v.y *= 0.91; v.z *= 0.91;

        const fy = Math.sin(time * floatSpeed + floatOff) * floatAmp;
        const fx = Math.cos(time * floatSpeed * 0.7 + floatOff) * floatAmp * 0.45;

        const sx = (ox - k.position.x) * 0.038;
        const sy = (oy - k.position.y) * 0.038;
        const sz = (oz - k.position.z) * 0.038;

        k.position.x += v.x + sx + fx * 0.012;
        k.position.y += v.y + sy + fy * 0.012 - scrollShift * (0.4 + i * 0.009);
        k.position.z += v.z + sz;

        k.rotation.x += rotSpeed * 0.45;
        k.rotation.y += rotSpeed;
        k.rotation.z += rotSpeed * 0.28;

        const depth = Math.min(Math.max((k.position.z + 16) / 32, 0), 1);
        k.scale.setScalar(0.55 + depth * 0.45);
      });

      if (lightsRef.current) {
        lightsRef.current.gold.position.x = 12 + Math.sin(time * 0.4) * 4;
        lightsRef.current.gold.position.y = 12 + Math.cos(time * 0.3) * 3;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("touchstart",onTouch);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-canvas"
      className="fixed inset-0 pointer-events-none"
    />
  );
}
