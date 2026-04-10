"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Environment, Box } from "@react-three/drei";
import * as THREE from "three";

function AbstractAvatar() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
      {/* A stylized shield/cube as avatar representation */}
      <Box args={[1.5, 1.5, 1.5]} ref={meshRef} castShadow>
        <MeshDistortMaterial
          color="#F4A024"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.8}
          roughness={0.1}
          distort={0.2}
          speed={3}
        />
      </Box>
      
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#2ECC71" emissive="#2ECC71" emissiveIntensity={0.5} wireframe />
      </mesh>
    </Float>
  );
}

export function Avatar3D({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#2ECC71" />
        
        <AbstractAvatar />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}
