"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function uniqueIcosahedronPoints(radius: number, detail: number) {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.attributes.position;
  const seen = new Set<string>();
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    const key = `${v.x.toFixed(3)}|${v.y.toFixed(3)}|${v.z.toFixed(3)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pts.push(v);
  }
  geo.dispose();
  return pts;
}

function AgentCore() {
  const core = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const nodes = useMemo(() => uniqueIcosahedronPoints(1.55, 1), []);
  const links = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.45) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y = t * 0.28;
      core.current.rotation.x = Math.sin(t * 0.35) * 0.12;
    }
    if (wire.current) {
      wire.current.rotation.y = t * -0.18;
      wire.current.rotation.z = t * 0.08;
    }
    if (pulse.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.08;
      pulse.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshStandardMaterial
          color="#00AEEF"
          emissive="#003B73"
          emissiveIntensity={0.85}
          metalness={0.92}
          roughness={0.08}
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshBasicMaterial color="#FBB03B" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={pulse}>
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshBasicMaterial color="#00AEEF" transparent opacity={0.08} />
      </mesh>
      {nodes.map((p, i) => (
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[i % 4 === 0 ? 0.055 : 0.035, 12, 12]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#FBB03B" : "#00AEEF"}
            emissive={i % 3 === 0 ? "#F15A24" : "#00AEEF"}
            emissiveIntensity={0.9}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
      <NeuralLinks positions={links} />
      <OrbitRing radius={1.85} color="#00AEEF" speed={0.32} tilt={0.7} />
      <OrbitRing radius={2.15} color="#FBB03B" speed={-0.22} tilt={1.1} />
      <OrbitRing radius={2.4} color="#F15A24" speed={0.14} tilt={0.35} />
    </group>
  );
}

function NeuralLinks({ positions }: { positions: Float32Array }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#33C1F5" transparent opacity={0.28} />
    </lineSegments>
  );
}

function OrbitRing({
  radius,
  color,
  speed,
  tilt = 0.6,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 12, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
}

function CommerceStage() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.1, 64]} />
        <meshStandardMaterial
          color="#051937"
          metalness={0.85}
          roughness={0.22}
          emissive="#003B73"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, -1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.55, 64]} />
        <meshBasicMaterial color="#FBB03B" transparent opacity={0.35} />
      </mesh>
      <Float speed={1.2} floatIntensity={0.35} rotationIntensity={0.15}>
        <mesh position={[0, 0.1, 0]}>
          <torusKnotGeometry args={[0.55, 0.18, 180, 24]} />
          <meshStandardMaterial
            color="#FBB03B"
            emissive="#F15A24"
            emissiveIntensity={0.35}
            metalness={1}
            roughness={0.12}
          />
        </mesh>
      </Float>
      <Float speed={1.6} floatIntensity={0.55} rotationIntensity={0.2}>
        <mesh position={[1.15, 0.15, 0.35]} rotation={[-0.2, 0.4, 0.1]}>
          <boxGeometry args={[0.72, 1.15, 0.05]} />
          <meshStandardMaterial
            color="#0A2540"
            emissive="#00AEEF"
            emissiveIntensity={0.55}
            metalness={0.5}
            roughness={0.18}
          />
        </mesh>
      </Float>
      <Float speed={1.9} floatIntensity={0.7} rotationIntensity={0.25}>
        <mesh position={[-1.05, -0.05, 0.55]}>
          <boxGeometry args={[0.38, 0.78, 0.05]} />
          <meshStandardMaterial color="#F15A24" metalness={0.65} roughness={0.16} />
        </mesh>
      </Float>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.16, 32]} />
        <meshStandardMaterial color="#eef3fa" metalness={0.7} roughness={0.18} />
      </mesh>
    </group>
  );
}

function OpsHologram() {
  const bars = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const count = 10;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (bars.current) {
      bars.current.children.forEach((child, i) => {
        child.scale.y = 0.45 + Math.abs(Math.sin(t * 1.5 + i * 0.55)) * 1.65;
      });
    }
    if (ring.current) {
      ring.current.rotation.y = t * 0.25;
      ring.current.rotation.x = 0.35;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
        <circleGeometry args={[2.2, 64]} />
        <meshBasicMaterial color="#00AEEF" transparent opacity={0.05} />
      </mesh>
      <gridHelper args={[5, 18, "#003B73", "#0A2540"]} position={[0, -0.95, 0]} />
      <group ref={bars} position={[0, -0.7, 0]}>
        {Array.from({ length: count }).map((_, i) => {
          const a = (i / count) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.15, 0.5, Math.sin(a) * 1.15]}>
              <boxGeometry args={[0.16, 0.9, 0.16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#00AEEF" : "#FBB03B"}
                emissive={i % 2 === 0 ? "#00AEEF" : "#F15A24"}
                emissiveIntensity={0.55}
                metalness={0.7}
                roughness={0.18}
              />
            </mesh>
          );
        })}
      </group>
      <group ref={ring}>
        <mesh>
          <torusGeometry args={[1.55, 0.015, 12, 96]} />
          <meshBasicMaterial color="#00AEEF" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
          <torusGeometry args={[1.2, 0.01, 8, 80]} />
          <meshBasicMaterial color="#FBB03B" transparent opacity={0.5} />
        </mesh>
      </group>
      <Float speed={1.3} floatIntensity={0.4} rotationIntensity={0.1}>
        <mesh position={[0, 0.85, 0]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00AEEF"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ variant }: { variant: "agent" | "commerce" | "ops" }) {
  const root = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!root.current) return;
    root.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.15;
  });

  return (
    <group ref={root}>
      {variant === "agent" && <AgentCore />}
      {variant === "commerce" && <CommerceStage />}
      {variant === "ops" && <OpsHologram />}
    </group>
  );
}

export function LuxuryDemoCanvas({ variant }: { variant: "agent" | "commerce" | "ops" }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.45, 5.1], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#051937"]} />
      <fog attach="fog" args={["#051937", 7, 14]} />
      <ambientLight intensity={0.35} />
      <spotLight position={[5, 7, 4]} intensity={42} color="#00AEEF" angle={0.45} penumbra={1} />
      <spotLight position={[-4, 3, 5]} intensity={26} color="#F15A24" angle={0.5} penumbra={1} />
      <pointLight position={[0, -1.2, 2]} intensity={8} color="#FBB03B" />
      <Scene variant={variant} />
      <Sparkles count={42} scale={7} size={1.8} speed={0.38} color="#00AEEF" opacity={0.5} />
      <Sparkles count={22} scale={5.5} size={1.3} speed={0.45} color="#FBB03B" opacity={0.42} />
    </Canvas>
  );
}
