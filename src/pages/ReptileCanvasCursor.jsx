import React, { useRef, useEffect, useState } from 'react';

const SEGMENTS = 60; // Number of snake segments
const SEGMENT_LENGTH = 12; // Distance between segments

// Particle system for trail
const MAX_PARTICLES = 80;
const PARTICLE_LIFETIME = 38; // frames
const PARTICLE_SIZE = 4;
const PARTICLE_COLOR = '#e0e7ff'; // Light purple/white to match pulse and gradient

let particles = [];

const addParticle = (x, y, angle) => {
  const speed = 1.5 + Math.random() * 1.2;
  particles.push({
    x,
    y,
    vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.7,
    vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.7,
    life: PARTICLE_LIFETIME,
    maxLife: PARTICLE_LIFETIME,
  });
  if (particles.length > MAX_PARTICLES) particles.shift();
};

// Gradient colors
const SNAKE_START = '#667eea'; // Indigo
const SNAKE_END = '#764ba2';   // Purple
const PULSE_COLOR = '#e0e7ff'; // Light purple/white for pulse

const LEG_LENGTH = 16; // Length of each spike/leg
const LEGS_PER_SEGMENT = 6; // Number of spikes/legs per segment
const LEG_ANGLE_SPREAD = Math.PI / 1.5; // Spread of spikes/legs

const ReptileCanvasCursor = () => {
  const canvasRef = useRef(null);
  const points = useRef(
    Array.from({ length: SEGMENTS }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
  );
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animationRef = useRef();
  const [pulse, setPulse] = useState(0); // 0 = no pulse, >0 = pulsing

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Pulse on click
  useEffect(() => {
    const handleClick = () => {
      setPulse(1);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  // Pulse animation decay
  useEffect(() => {
    if (pulse > 0) {
      const t = setTimeout(() => setPulse(pulse * 0.7), 30);
      if (pulse < 0.05) setPulse(0);
      return () => clearTimeout(t);
    }
  }, [pulse]);

  useEffect(() => {
    const animate = () => {
      // Move head towards a point 30px behind the mouse in the direction of movement
      const prevHead = { ...points.current[0] };
      const dx = mouse.current.x - prevHead.x;
      const dy = mouse.current.y - prevHead.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let targetX = mouse.current.x;
      let targetY = mouse.current.y;
      if (dist > 0) {
        // Offset 30px behind the cursor
        targetX = mouse.current.x - (dx / dist) * 30;
        targetY = mouse.current.y - (dy / dist) * 30;
      }
      points.current[0].x += (targetX - points.current[0].x) * 0.35;
      points.current[0].y += (targetY - points.current[0].y) * 0.35;
      // Each segment follows the previous
      for (let i = 1; i < SEGMENTS; i++) {
        const prev = points.current[i - 1];
        const curr = points.current[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const targetX = prev.x - Math.cos(angle) * SEGMENT_LENGTH;
        const targetY = prev.y - Math.sin(angle) * SEGMENT_LENGTH;
        curr.x += (targetX - curr.x) * 0.5;
        curr.y += (targetY - curr.y) * 0.5;
      }
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
    // eslint-disable-next-line
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw snake body as a stroked path (gradient line)
    ctx.save();
    const grad = ctx.createLinearGradient(
      points.current[0].x, points.current[0].y,
      points.current[SEGMENTS - 1].x, points.current[SEGMENTS - 1].y
    );
    grad.addColorStop(0, SNAKE_START);
    grad.addColorStop(1, SNAKE_END);
    ctx.strokeStyle = pulse > 0 ? PULSE_COLOR : grad;
    ctx.lineWidth = 2 + pulse * 7;
    ctx.shadowColor = pulse > 0 ? PULSE_COLOR : SNAKE_END;
    ctx.shadowBlur = 8 + pulse * 16;
    ctx.beginPath();
    ctx.moveTo(points.current[0].x, points.current[0].y);
    for (let i = 1; i < SEGMENTS; i++) {
      ctx.lineTo(points.current[i].x, points.current[i].y);
    }
    ctx.stroke();
    ctx.restore();

    // Draw snake body circles for 3D/organic look
    for (let i = 1; i < SEGMENTS; i++) {
      const t = i / (SEGMENTS - 1);
      const segColor = pulse > 0 ? PULSE_COLOR : lerpColor(SNAKE_START, SNAKE_END, t);
      ctx.save();
      ctx.beginPath();
      // Make the body slightly thicker in the middle
      const radius = 7 + 6 * Math.sin(Math.PI * t);
      ctx.arc(points.current[i].x, points.current[i].y, radius, 0, Math.PI * 2);
      ctx.globalAlpha = 0.22 + 0.18 * Math.sin(Math.PI * t);
      ctx.fillStyle = segColor;
      ctx.shadowColor = segColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Draw head (bigger, with eyes and tongue)
    const head = points.current[0];
    const next = points.current[1];
    const headAngle = Math.atan2(next.y - head.y, next.x - head.x);
    ctx.save();
    ctx.beginPath();
    ctx.arc(head.x, head.y, 13 + pulse * 7, 0, Math.PI * 2);
    ctx.fillStyle = pulse > 0 ? PULSE_COLOR : SNAKE_START;
    ctx.shadowColor = pulse > 0 ? PULSE_COLOR : SNAKE_END;
    ctx.shadowBlur = 12 + pulse * 18;
    ctx.globalAlpha = 0.98;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    // Eyes
    const eyeOffset = 6;
    const eyeAngle = Math.PI / 5;
    for (let e = -1; e <= 1; e += 2) {
      ctx.save();
      ctx.beginPath();
      // Eye position offset from head center
      const ex = head.x + Math.cos(headAngle + e * eyeAngle) * eyeOffset;
      const ey = head.y + Math.sin(headAngle + e * eyeAngle) * eyeOffset;
      ctx.arc(ex, ey, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#222';
      ctx.fill();
      // Pupil (looks in direction of movement)
      ctx.beginPath();
      ctx.arc(
        ex + Math.cos(headAngle) * 1.2,
        ey + Math.sin(headAngle) * 1.2,
        1.1,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.restore();
    }
    // Tongue (flicks out occasionally)
    if (Math.floor(Date.now() / 300) % 8 === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(head.x + Math.cos(headAngle) * 13, head.y + Math.sin(headAngle) * 13);
      ctx.lineTo(head.x + Math.cos(headAngle) * 23, head.y + Math.sin(headAngle) * 23);
      ctx.strokeStyle = '#ff2222';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      // Forked tongue
      ctx.beginPath();
      ctx.moveTo(head.x + Math.cos(headAngle) * 23, head.y + Math.sin(headAngle) * 23);
      ctx.lineTo(
        head.x + Math.cos(headAngle + 0.18) * 27,
        head.y + Math.sin(headAngle + 0.18) * 27
      );
      ctx.moveTo(head.x + Math.cos(headAngle) * 23, head.y + Math.sin(headAngle) * 23);
      ctx.lineTo(
        head.x + Math.cos(headAngle - 0.18) * 27,
        head.y + Math.sin(headAngle - 0.18) * 27
      );
      ctx.strokeStyle = '#ff2222';
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();
    }

    // Draw tail (thin, last 10 segments)
    for (let i = SEGMENTS - 10; i < SEGMENTS - 1; i++) {
      const curr = points.current[i];
      const next = points.current[i + 1];
      const t = i / (SEGMENTS - 1);
      const segColor = pulse > 0 ? PULSE_COLOR : lerpColor(SNAKE_START, SNAKE_END, t);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(curr.x, curr.y);
      ctx.lineTo(next.x, next.y);
      ctx.strokeStyle = segColor;
      ctx.lineWidth = 3;
      ctx.shadowColor = segColor;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.restore();
    }

    // Draw centipede/centipede-like spikes/legs from each segment
    for (let i = 0; i < SEGMENTS; i++) {
      const curr = points.current[i];
      const next = i === 0 ? points.current[1] : points.current[i - 1];
      const angle = Math.atan2(next.y - curr.y, next.x - curr.x);
      const t = i / (SEGMENTS - 1);
      const segColor = pulse > 0 ? PULSE_COLOR : lerpColor(SNAKE_START, SNAKE_END, t);
      for (let l = 0; l < LEGS_PER_SEGMENT; l++) {
        const legAngle = angle + (l - (LEGS_PER_SEGMENT - 1) / 2) * (LEG_ANGLE_SPREAD / (LEGS_PER_SEGMENT - 1));
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(curr.x, curr.y);
        ctx.lineTo(
          curr.x + Math.cos(legAngle) * LEG_LENGTH,
          curr.y + Math.sin(legAngle) * LEG_LENGTH
        );
        ctx.strokeStyle = segColor;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = segColor;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }

    // Particle trail
    // Emit a particle from the head every frame
    addParticle(head.x, head.y, headAngle);
    // Draw and update particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.save();
      ctx.globalAlpha = p.life / p.maxLife;
      ctx.beginPath();
      ctx.arc(p.x, p.y, PARTICLE_SIZE * (p.life / p.maxLife), 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.shadowColor = PARTICLE_COLOR;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
      // Update
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
    }
    // Remove dead particles
    particles = particles.filter(p => p.life > 0);
  };

  // Helper to interpolate between two hex colors
  function lerpColor(a, b, t) {
    const ah = a.replace('#', '');
    const bh = b.replace('#', '');
    const ar = parseInt(ah.substring(0, 2), 16);
    const ag = parseInt(ah.substring(2, 4), 16);
    const ab = parseInt(ah.substring(4, 6), 16);
    const br = parseInt(bh.substring(0, 2), 16);
    const bg = parseInt(bh.substring(2, 4), 16);
    const bb = parseInt(bh.substring(4, 6), 16);
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return `rgb(${rr},${rg},${rb})`;
  }

  // Resize canvas to fill window
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <style>{`
        .reptile-canvas-cursor-hide * { cursor: none !important; }
        .reptile-canvas-cursor-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }
      `}</style>
      <div className="reptile-canvas-cursor-hide">
        <canvas ref={canvasRef} className="reptile-canvas-cursor-overlay" />
      </div>
    </>
  );
};

export default ReptileCanvasCursor; 