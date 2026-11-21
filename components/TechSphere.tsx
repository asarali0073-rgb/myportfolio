'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FONT = '500 30px "DM Mono", ui-monospace, Menlo, monospace';

function drawLabel(canvas: HTMLCanvasElement, text: string) {
  const g = canvas.getContext('2d')!;
  g.clearRect(0, 0, canvas.width, canvas.height);
  g.fillStyle = 'rgba(10,12,22,.82)';
  g.strokeStyle = 'rgba(84,243,233,.55)';
  g.lineWidth = 2;
  g.beginPath();
  g.roundRect(4, 4, canvas.width - 8, canvas.height - 8, 14);
  g.fill();
  g.stroke();
  g.font = FONT;
  g.fillStyle = '#eafdfb';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, canvas.width / 2, canvas.height / 2 + 1);
}

export default function TechSphere({ items }: { items: string[] }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const R = 2.6;
    const group = new THREE.Group();
    group.rotation.x = 0.25;
    scene.add(group);

    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = glowCanvas.height = 64;
    const gg = glowCanvas.getContext('2d')!;
    const gr = gg.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    gg.fillStyle = gr;
    gg.fillRect(0, 0, 64, 64);
    const glowTex = new THREE.CanvasTexture(glowCanvas);

    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), new THREE.MeshBasicMaterial({ color: 0x54f3e9, wireframe: true, transparent: true, opacity: 0.7 })));
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(R, 2), new THREE.MeshBasicMaterial({ color: 0xb66cff, wireframe: true, transparent: true, opacity: 0.07, depthWrite: false })));
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xb66cff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    core.scale.set(3.2, 3.2, 1);
    group.add(core);

    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: THREE.Vector3[] = [];
    const labels: { sprite: THREE.Sprite; canvas: HTMLCanvasElement; tex: THREE.CanvasTexture; text: string }[] = [];
    items.forEach((text, i) => {
      const y = n > 1 ? 1 - (i / (n - 1)) * 2 : 0;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const p = new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R);
      pts.push(p);
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 80;
      drawLabel(canvas, text);
      const tex = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false }));
      sprite.position.copy(p);
      sprite.scale.set(1.6, 0.4, 1);
      group.add(sprite);
      labels.push({ sprite, canvas, tex, text });
    });
    document.fonts?.ready.then(() => labels.forEach((l) => { drawLabel(l.canvas, l.text); l.tex.needsUpdate = true; }));

    const seg: number[] = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (pts[i].distanceTo(pts[j]) < 2.2) seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
    group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0xb66cff, transparent: true, opacity: 0.2 })));

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.position.set(0, 0, 8.2 * Math.max(1, 1.05 / camera.aspect));
      camera.updateProjectionMatrix();
      if (reduce) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let dragging = false, lastX = 0, lastY = 0, vy = 0;
    const down = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; mount.setPointerCapture(e.pointerId); mount.classList.add('is-dragging'); };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vy = (e.clientX - lastX) * 0.006;
      group.rotation.y += vy;
      group.rotation.x = Math.max(-1, Math.min(1, group.rotation.x + (e.clientY - lastY) * 0.004));
      lastX = e.clientX;
      lastY = e.clientY;
      if (reduce) renderer.render(scene, camera);
    };
    const up = () => { dragging = false; mount.classList.remove('is-dragging'); };
    mount.addEventListener('pointerdown', down);
    mount.addEventListener('pointermove', move);
    mount.addEventListener('pointerup', up);
    mount.addEventListener('pointercancel', up);

    const v = new THREE.Vector3();
    const render = () => {
      if (!dragging) { vy *= 0.95; group.rotation.y += 0.0035 + vy; }
      group.updateMatrixWorld(true);
      labels.forEach(({ sprite }) => {
        sprite.getWorldPosition(v);
        const f = (v.z + R) / (2 * R);
        sprite.material.opacity = 0.18 + 0.82 * f;
        sprite.scale.set(1.6 * (0.85 + 0.3 * f), 0.4 * (0.85 + 0.3 * f), 1);
      });
      renderer.render(scene, camera);
    };
    let raf = 0;
    let visible = true;
    const loop = () => { render(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && !reduce && visible && !document.hidden) loop(); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(mount);
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener('visibilitychange', onVis);
    start();
    if (reduce) render();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      mount.removeEventListener('pointerdown', down);
      mount.removeEventListener('pointermove', move);
      mount.removeEventListener('pointerup', up);
      mount.removeEventListener('pointercancel', up);
      labels.forEach((l) => { l.tex.dispose(); l.sprite.material.dispose(); });
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      glowTex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [items]);

  return <div ref={mountRef} className="tech-canvas" role="img" aria-label="Rotating 3D sphere of technologies. Drag to rotate." />;
}
