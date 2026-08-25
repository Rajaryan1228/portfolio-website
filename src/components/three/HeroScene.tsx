"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import * as THREE from "three";

// ─── Floating 3D geometric shape (Torus Knot) ───
function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <torusKnotGeometry args={[1, 0.32, 160, 32, 2, 3]} />
      <meshStandardMaterial
        color="#7c3aed"
        roughness={0.1}
        metalness={0.7}
        emissive="#4c1d95"
        emissiveIntensity={0.3}
        wireframe={false}
      />
    </mesh>
  );
}

// ─── Particle field ───
function Particles({ count = 120 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

// ─── Mouse-reactive camera rig ───
function CameraRig({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  useFrame(({ camera }) => {
    camera.position.x += (mouseX.get() * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY.get() * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#a78bfa" />
      <pointLight position={[-4, -2, 2]} intensity={1} color="#7c3aed" />
      <FloatingShape />
      <Particles />
      <CameraRig mouseX={springX} mouseY={springY} />
    </Canvas>
  );
}
