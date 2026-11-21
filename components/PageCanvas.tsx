'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type PageVariant = 'stars' | 'cube' | 'rings' | 'wave';

function makeDot() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.35, 'rgba(255,255,255,.55)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export default function PageCanvas({ variant }: { variant: PageVariant }) {
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
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    const dot = makeDot();
    const CYAN = 0x54f3e9;
    const PURPLE = 0xb66cff;
    const group = new THREE.Group();
    scene.add(group);
    const updates: ((t: number) => void)[] = [];

    const edges = (geo: THREE.BufferGeometry, color: number, opacity: number) =>
      new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
    const glow = (color: number, size: number, opacity: number) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
      s.scale.set(size, size, 1);
      return s;
    };

    // shared starfield
    const N = variant === 'wave' ? 700 : 1200;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const cA = new THREE.Color(PURPLE);
    const cB = new THREE.Color(CYAN);
    const tmp = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const r = 6 + Math.random() * 20;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph) - 4;
      tmp.copy(cA).lerp(cB, Math.random()).multiplyScalar(0.5 + Math.random() * 0.5);
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.13, map: dot, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(stars);
    updates.push((t) => stars.rotation.set(t * 0.004, t * 0.012, 0));

    if (variant === 'cube') {
      const boxes = [
        { s: 3.2, c: CYAN, o: 0.6, sp: 0.18 },
        { s: 2.2, c: PURPLE, o: 0.75, sp: -0.3 },
        { s: 1.2, c: 0xffffff, o: 0.5, sp: 0.5 }
      ].map((b) => ({ ...b, m: edges(new THREE.BoxGeometry(b.s, b.s, b.s), b.c, b.o) }));
      boxes.forEach((b) => group.add(b.m));
      group.add(glow(PURPLE, 6, 0.45));
      const blocks = Array.from({ length: 14 }, (_, i) => {
        const m = edges(new THREE.BoxGeometry(0.28, 0.28, 0.28), i % 2 ? CYAN : PURPLE, 0.85);
        group.add(m);
        return { m, a: (i / 14) * Math.PI * 2, r: 3.7 + (i % 3) * 0.45, sp: 0.18 + (i % 4) * 0.04, y: i * 0.7 };
      });
      updates.push((t) => {
        boxes.forEach((b, i) => b.m.rotation.set(t * b.sp, t * b.sp * 1.3, i * 0.4));
        blocks.forEach((b) => {
          const a = b.a + t * b.sp;
          b.m.position.set(Math.cos(a) * b.r, Math.sin(t * 0.8 + b.y) * 1.2, Math.sin(a) * b.r);
          b.m.rotation.set(t * 0.6, t * 0.4, 0);
        });
      });
    }

    if (variant === 'rings') {
      const rings = [
        { r: 2.9, c: CYAN, tilt: [1.2, 0, 0.3], sp: 0.5 },
        { r: 2.4, c: PURPLE, tilt: [0.2, 1.1, 0], sp: -0.65 },
        { r: 1.9, c: 0xffffff, tilt: [-0.7, 0.4, 1], sp: 0.85 }
      ].map((cfg) => {
        const pivot = new THREE.Group();
        pivot.rotation.set(cfg.tilt[0], cfg.tilt[1], cfg.tilt[2]);
        const spinner = new THREE.Group();
        spinner.add(new THREE.Mesh(new THREE.TorusGeometry(cfg.r, 0.016, 8, 160), new THREE.MeshBasicMaterial({ color: cfg.c, transparent: true, opacity: 0.6 })));
        const sat = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), new THREE.MeshBasicMaterial({ color: cfg.c }));
        sat.position.x = cfg.r;
        sat.add(glow(cfg.c, 0.8, 0.9));
        spinner.add(sat);
        pivot.add(spinner);
        group.add(pivot);
        return { pivot, spinner, sp: cfg.sp };
      });
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 1), new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.8 }));
      group.add(core, glow(PURPLE, 4.5, 0.5));
      updates.push((t) => {
        rings.forEach((r, i) => { r.spinner.rotation.z = t * r.sp; r.pivot.rotation.y += 0.0015 * (i + 1); });
        core.rotation.set(t * 0.4, t * 0.6, 0);
        core.scale.setScalar(1 + Math.sin(t * 2) * 0.06);
      });
    }

    if (variant === 'wave') {
      const cols = 64, rows = 36, sp = 0.44;
      const wp = new Float32Array(cols * rows * 3);
      const wc = new Float32Array(cols * rows * 3);
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const k = (j * cols + i) * 3;
        wp[k] = (i - cols / 2) * sp;
        wp[k + 2] = (j - rows / 2) * sp;
      }
      const wg = new THREE.BufferGeometry();
      wg.setAttribute('position', new THREE.BufferAttribute(wp, 3));
      wg.setAttribute('color', new THREE.BufferAttribute(wc, 3));
      const wave = new THREE.Points(wg, new THREE.PointsMaterial({ size: 0.12, map: dot, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending }));
      wave.rotation.x = -0.3;
      group.add(wave);
      const c1 = new THREE.Color(PURPLE), c2 = new THREE.Color(CYAN), c = new THREE.Color();
      const step = (t: number) => {
        for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
          const k = (j * cols + i) * 3;
          const x = wp[k], z = wp[k + 2];
          const y = Math.sin(x * 0.5 + t * 1.2) * 0.5 + Math.cos(z * 0.6 + t * 0.9) * 0.45 + Math.sin((x + z) * 0.3 - t * 0.7) * 0.3;
          wp[k + 1] = y;
          c.copy(c1).lerp(c2, (y + 1.2) / 2.4).multiplyScalar(0.55 + (y + 1.2) * 0.25);
          wc[k] = c.r; wc[k + 1] = c.g; wc[k + 2] = c.b;
        }
        wg.attributes.position.needsUpdate = true;
        wg.attributes.color.needsUpdate = true;
      };
      updates.push(step);
    }

    const place = (w: number) => {
      if (variant === 'wave') { group.position.set(0, -3.4, -3); group.scale.setScalar(w > 900 ? 1 : 0.8); return; }
      if (variant === 'stars') { group.visible = false; return; }
      if (w > 900) { group.position.set(3.7, -0.1, 0); group.scale.setScalar(1); }
      else if (w > 650) { group.position.set(2.2, -0.2, 0); group.scale.setScalar(0.8); }
      else { group.position.set(0.8, 0.2, -2.5); group.scale.setScalar(0.7); }
    };
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      place(w);
      if (reduce) { updates.forEach((u) => u(2)); renderer.render(scene, camera); }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let tx = 0, ty = 0, mx = 0, my = 0;
    const onMove = (e: PointerEvent) => { tx = (e.clientX / window.innerWidth) * 2 - 1; ty = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('pointermove', onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0, visible = true;
    const render = () => {
      const t = clock.getElapsedTime();
      updates.forEach((u) => u(t));
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      group.rotation.set(variant === 'wave' ? 0 : my * 0.3, variant === 'wave' ? mx * 0.15 : mx * 0.5, 0);
      camera.position.set(mx * 0.6, -my * 0.4, 10);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    const loop = () => { render(); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && !reduce && visible && !document.hidden) loop(); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(mount);
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      dot.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}
