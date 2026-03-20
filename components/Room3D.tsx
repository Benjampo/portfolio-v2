import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { motion } from 'framer-motion';

function Model() {
  const { scene } = useGLTF('/models/9a8442c83d1948f1.glb');
  return <primitive object={scene} scale={4} position={[0.6, -0.5, 0]} rotation={[0.05, 0, 0.45]} />;
}

export default function Room3D() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className='w-full h-[50vh] md:h-[60vh] rounded-[22px] overflow-hidden'
    >
      <Canvas camera={{ position: [0, 0.5, 8], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-3, 4, -2]} intensity={0.4} />
          <Model />
          <ContactShadows
            position={[0.6, -4, 0]}
            opacity={0.25}
            scale={10}
            blur={3}
          />
          <Environment preset='city' />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
