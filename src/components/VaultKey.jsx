import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DataStream = () => {
  const pointsRef = useRef();
  
  // Generate particles for the data stream
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(1000 * 3);
    const cols = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      cols[i * 3] = 0.83; // Gold-ish
      cols[i * 3 + 1] = 0.68;
      cols[i * 3 + 2] = 0.21;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const KeyMesh = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 8;
    meshRef.current.rotation.y = Math.sin(t / 4) / 8;
    meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#d4af37"
          speed={2}
          distort={0.3}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const VaultKey = () => {
  return (
    <div className="vault-key-container" style={{ width: '100%', height: '400px', cursor: 'grab' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <KeyMesh />
        <DataStream />
      </Canvas>
    </div>
  );
};

export default VaultKey;
