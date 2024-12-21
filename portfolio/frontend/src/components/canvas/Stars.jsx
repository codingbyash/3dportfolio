import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(10000), { radius: 1.5 })); // Increased points to 10,000

  // Create a function to generate random colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Add an array of colors and sizes
  const colors = Array.from({ length: 10000 }, () => getRandomColor());
  const sizes = Array.from({ length: 10000 }, () => Math.random() * 0.003 + 0.001);

  useFrame((state, delta) => {
    // Rotate the group around the Y axis
    ref.current.rotation.y += delta / 10; // Adjust rotation speed as needed
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Points positions={sphere} stride={3} frustumCulled {...props}>
        {colors.map((color, index) => (
          <PointMaterial
            key={index}
            transparent
            color={color} // Assign random colors to each point
            size={sizes[index]} // Random size for each point
            sizeAttenuation={true}
            depthWrite={false}
          />
        ))}
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 2] }}> {/* Adjusted camera position for better view */}
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
