'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // WebGL not available: the hero image still shows
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

    const hero = new THREE.Group();
    scene.add(hero);
    const wire = (geo: THREE.BufferGeometry, color: number, opacity: number) =>
      new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, depthWrite: false }));
    const outer = wire(new THREE.IcosahedronGeometry(2.1, 1), CYAN, 0.5);
    const mid = wire(new THREE.DodecahedronGeometry(1.4, 0), PURPLE, 0.7);
    const knot = wire(new THREE.TorusKnotGeometry(0.55, 0.17, 140, 14, 2, 3), 0xffffff, 0.35);
    hero.add(outer, mid, knot);

    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: PURPLE, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.set(6.5, 6.5, 1);
    hero.add(glow);

    const ringCfg = [
      { r: 2.9, tx: 0.5, tz: 0, color: CYAN, speed: 0.6 },
      { r: 3.4, tx: -0.9, tz: 0.6, color: PURPLE, speed: -0.45 },
      { r: 3.9, tx: 1.2, tz: -0.4, color: 0xffffff, speed: 0.3 }
    ];
    const rings = ringCfg.map((cfg) => {
      const pivot = new THREE.Group();
      pivot.rotation.set(cfg.tx, 0, cfg.tz);
      pivot.add(new THREE.Mesh(new THREE.TorusGeometry(cfg.r, 0.006, 6, 160), new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.35 })));
      const sat = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), new THREE.MeshBasicMaterial({ color: cfg.color }));
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: cfg.color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
      halo.scale.set(0.7, 0.7, 1);
      sat.add(halo);
      pivot.add(sat);
      hero.add(pivot);
      return { pivot, sat, r: cfg.r, speed: cfg.speed };
    });

    const N = 1600;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const cA = new THREE.Color(PURPLE);
    const cB = new THREE.Color(CYAN);
    const tmp = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const r = 5 + Math.random() * 20;
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

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (w > 900) { hero.position.set(3.6, -0.2, 0); hero.scale.setScalar(1); }
      else if (w > 650) { hero.position.set(2.2, -0.2, 0); hero.scale.setScalar(0.85); }
      else { hero.position.set(0.6, 0.2, -2.5); hero.scale.setScalar(0.75); }
      if (reduce) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    let tx = 0, ty = 0, mx = 0, my = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    const render = () => {
      const t = clock.getElapsedTime();
      outer.rotation.set(t * 0.07, t * 0.15, 0);
      mid.rotation.set(0, -t * 0.3, t * 0.12);
      mid.scale.setScalar(1 + Math.sin(t * 1.6) * 0.03);
      knot.rotation.set(t * 0.4, t * 0.25, 0);
      rings.forEach((rg, i) => {
        const a = t * rg.speed + i * 2;
        rg.sat.position.set(Math.cos(a) * rg.r, Math.sin(a) * rg.r, 0);
        rg.pivot.rotation.y = t * 0.05 * (i + 1);
      });
      stars.rotation.set(t * 0.004, t * 0.012, 0);
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      hero.rotation.set(my * 0.3, mx * 0.5, 0);
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
  }, []);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}
