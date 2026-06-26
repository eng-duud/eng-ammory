"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

/* ── Colour palettes ────────────────────────────────────────── */
const PALETTES = {
  dark: {
    keyBody:    0x1c1c1c,
    keyTop:     0x252525,
    ambient:    0x111111,
    ambientInt: 1.5,
    gold:       0xC9A96E,
    goldInt:    5,
    blue:       0x3355ee,
    blueInt:    2,
    rim:        0xC9A96E,
    rimInt:     1.5,
    metalness:  0.4,
    roughness:  0.4,
  },
  light: {
    keyBody:    0xd4c9b8,
    keyTop:     0xe0d5c5,
    ambient:    0xddd0be,
    ambientInt: 2.5,
    gold:       0x8C6A32,
    goldInt:    6,
    blue:       0x4466bb,
    blueInt:    3,
    rim:        0x8C6A32,
    rimInt:     2.5,
    metalness:  0.2,
    roughness:  0.3,
  },
};

export default function KeyboardUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef  = useRef(theme);

  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    gold:    THREE.PointLight;
    blue:    THREE.PointLight;
    rim:     THREE.PointLight;
  } | null>(null);

  const keysRef = useRef<THREE.Group[]>([]);
  const draggingRef = useRef<{
    object: THREE.Group;
    offset: THREE.Vector3;
  } | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    const p = PALETTES[theme];
    if (!lightsRef.current) return;

    const { ambient, gold, blue, rim } = lightsRef.current;
    ambient.color.setHex(p.ambient);    ambient.intensity = p.ambientInt;
    gold.color.setHex(p.gold);          gold.intensity    = p.goldInt;
    blue.color.setHex(p.blue);          blue.intensity    = p.blueInt;
    rim.color.setHex(p.rim);            rim.intensity     = p.rimInt;

    keysRef.current.forEach((g) => {
      g.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshPhysicalMaterial;
          if (child.name === "body") mat.color.setHex(p.keyBody);
          if (child.name === "top") mat.color.setHex(p.keyTop);
          mat.metalness = p.metalness;
          mat.roughness = p.roughness;
        }
      });
    });
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 35);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true, // High resolution: enabled antialias
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // High resolution: up to 2x pixel ratio
    renderer.setClearColor(0x000000, 0);

    /* ── Lights ─────────────────────────────────────────────── */
    const p0 = PALETTES[themeRef.current];
    const ambient = new THREE.AmbientLight(p0.ambient, p0.ambientInt);
    scene.add(ambient);

    const gold = new THREE.PointLight(p0.gold, p0.goldInt, 100);
    gold.position.set(15, 15, 25);
    scene.add(gold);

    const blue = new THREE.PointLight(p0.blue, p0.blueInt, 80);
    blue.position.set(-15, -15, 20);
    scene.add(blue);

    const rim = new THREE.PointLight(p0.rim, p0.rimInt, 60);
    rim.position.set(0, 0, 10);
    scene.add(rim);

    lightsRef.current = { ambient, gold, blue, rim };

    /* ── Keyboard Cluster ───────────────────────────────────── */
    const createKey = (x: number, y: number, label: string) => {
      const g = new THREE.Group();
      const p = PALETTES[themeRef.current];

      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: p.keyBody, metalness: p.metalness, roughness: p.roughness,
        transparent: true, opacity: 0.95,
      });
      const topMat = new THREE.MeshPhysicalMaterial({
        color: p.keyTop, metalness: p.metalness, roughness: p.roughness,
        transparent: true, opacity: 1,
      });

      const body = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 0.6), bodyMat);
      body.name = "body";
      g.add(body);

      const top = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 0.2), topMat);
      top.name = "top";
      top.position.z = 0.35;
      g.add(top);

      g.position.set(x, y, 0);
      g.userData = {
        ox: x, oy: y, oz: 0,
        floatOff: Math.random() * Math.PI * 2,
        isDragged: false
      };
      
      return g;
    };

    const keys: THREE.Group[] = [];
    const rows = 4;
    const cols = 8;
    const spacing = 2.4;
    const startX = -((cols - 1) * spacing) / 2;
    const startY = ((rows - 1) * spacing) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const k = createKey(startX + c * spacing, startY - r * spacing, "K");
        scene.add(k);
        keys.push(k);
      }
    }
    keysRef.current = keys;

    /* ── Raycasting for dragging ────────────────────────────── */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseDown = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(keys, true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj.parent && !(obj instanceof THREE.Group)) obj = obj.parent;
        
        if (obj instanceof THREE.Group) {
          draggingRef.current = {
            object: obj,
            offset: new THREE.Vector3().copy(intersects[0].point).sub(obj.position)
          };
          obj.userData.isDragged = true;
          canvas.style.cursor = "grabbing";
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      if (draggingRef.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectPoint);
        draggingRef.current.object.position.copy(intersectPoint.sub(draggingRef.current.offset));
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(keys, true);
        canvas.style.cursor = intersects.length > 0 ? "pointer" : "default";
      }
    };

    const onMouseUp = () => {
      if (draggingRef.current) {
        draggingRef.current.object.userData.isDragged = false;
        draggingRef.current = null;
        canvas.style.cursor = "default";
      }
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    window.addEventListener("resize",    onResize);

    let raf: number;
    let time = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.01;

      keys.forEach((k) => {
        if (!k.userData.isDragged) {
          const { ox, oy, oz, floatOff } = k.userData;
          // Cinematic return to original position
          k.position.x += (ox - k.position.x) * 0.03;
          k.position.y += (oy - k.position.y) * 0.03;
          k.position.z += (oz - k.position.z) * 0.03;
          
          // Ultra-subtle floating effect
          k.position.y += Math.sin(time * 0.4 + floatOff) * 0.003;
          
          // Elegant rotation
          k.rotation.x = Math.sin(time * 0.3 + floatOff) * 0.05;
          k.rotation.y = Math.cos(time * 0.3 + floatOff) * 0.05;
        }
      });

      // Lights movement
      if (lightsRef.current) {
        lightsRef.current.gold.position.x = 15 + Math.sin(time * 0.5) * 5;
        lightsRef.current.blue.position.y = -15 + Math.cos(time * 0.5) * 5;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      window.removeEventListener("resize",    onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-auto"
      style={{ touchAction: "none" }}
    />
  );
}
