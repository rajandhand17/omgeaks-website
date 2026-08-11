"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AgentCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.95, 2]} />
      <meshStandardMaterial
        color="#00AEEF"
        emissive="#003B73"
        emissiveIntensity={0.55}
        metalness={0.75}
        roughness={0.12}
      />
    </mesh>
  );
}

function OrbitRing({
  radius,
  color,
  speed,
}: {
  radius: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = 0.6 + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.018, 12, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.75} />
    </mesh>
  );
}

function CommerceStack() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.35;
  });
  return (
    <group ref={group}>
      <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.12}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.5, 0.08, 1]} />
          <meshStandardMaterial color="#eef3fa" metalness={0.6} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0.72, -0.35]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[1.45, 0.9, 0.05]} />
          <meshStandardMaterial
            color="#051937"
            emissive="#00AEEF"
            emissiveIntensity={0.4}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.8} floatIntensity={0.7} rotationIntensity={0.2}>
        <mesh position={[0.95, 0.2, 0.45]}>
          <boxGeometry args={[0.42, 0.82, 0.06]} />
          <meshStandardMaterial color="#F15A24" metalness={0.5} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

function OpsBars() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime * 1.4 + i;
      child.scale.y = 0.55 + Math.abs(Math.sin(t)) * 1.4;
    });
  });
  return (
    <group ref={ref} position={[0, -0.4, 0]}>
      {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
        <mesh key={x} position={[x, 0.4, 0]}>
          <boxGeometry args={[0.22, 0.8, 0.22]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00AEEF" : "#FBB03B"}
            emissive={i % 2 === 0 ? "#00AEEF" : "#F15A24"}
            emissiveIntensity={0.35}
            metalness={0.55}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export function LuxuryDemoCanvas({ variant }: { variant: "agent" | "commerce" | "ops" }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, 4.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#051937"]} />
      <fog attach="fog" args={["#051937", 6, 12]} />
      <ambientLight intensity={0.45} />
      <spotLight position={[4, 6, 3]} intensity={28} color="#00AEEF" angle={0.5} penumbra={1} />
      <spotLight position={[-3, 3, 4]} intensity={18} color="#F15A24" angle={0.55} penumbra={1} />
      {variant === "agent" && (
        <>
          <AgentCore />
          <OrbitRing radius={1.45} color="#00AEEF" speed={0.35} />
          <OrbitRing radius={1.75} color="#FBB03B" speed={-0.22} />
        </>
      )}
      {variant === "commerce" && <CommerceStack />}
      {variant === "ops" && (
        <>
          <OpsBars />
          <OrbitRing radius={1.9} color="#00AEEF" speed={0.18} />
        </>
      )}
      <Sparkles count={28} scale={6} size={1.6} speed={0.35} color="#00AEEF" opacity={0.45} />
      <Sparkles count={16} scale={5} size={1.2} speed={0.4} color="#FBB03B" opacity={0.4} />
    </Canvas>
  );
}
