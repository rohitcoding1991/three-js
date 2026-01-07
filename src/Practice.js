import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

softShadows();

const CustomBox = ({
  boxColor,
  args,
  position,
  wobbleSpeed = 1,
  wobbleFactor = 0.6,
}) => {
  const meshRef = React.useRef();

  const [expand, setExpand] = React.useState(false);

  // change scale height, width and depth
  const props = useSpring({
    scale: expand ? [1.5, 1.5, 1.5] : [1, 1, 1],
  });

  useFrame(() => {
    meshRef.current.rotation.x = meshRef.current.rotation.x + 0.01;
    meshRef.current.rotation.y = meshRef.current.rotation.y + 0.01;
  });
  return (
    <a.mesh
      onClick={() => setExpand((prev) => !prev)}
      scale={props.scale}
      castShadow
      position={position}
      ref={meshRef}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      {/* <circleBufferGeometry attach="geometry" args={[1, 360]} /> */}
      {/* <meshStandardMaterial attach="material" color={boxColor} /> */}
      <MeshWobbleMaterial
        attach="material"
        color={boxColor}
        speed={wobbleSpeed}
        factor={wobbleSpeed}
      />
    </a.mesh>
  );
};

const Practice = () => {
  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          padding: 8,
          margin: 8,
        }}
      >
        <h3>Drag to move</h3>
        <h3>Click an object to expand</h3>
      </div>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        {/* Ambient light - Glowing all the objects from all the sides equally, it never cast shadows */}
        <ambientLight intensity={0.1} />
        {/* pointLight from left side */}
        <pointLight intensity={1} position={[-10, 0, -5]} />
        {/* pointLight from bottom side */}
        <pointLight intensity={1.5} position={[0, -10, 0]} />
        {/* directionalLight from top, directional light cast shadow */}
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* creating plane to cast shadow */}
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            {/* This will cast a shadow */}
            <shadowMaterial attach="material" opacity={0.5} />
            {/* <meshStandardMaterial attach="material" color="yellow" /> */}
          </mesh>

          <CustomBox
            boxColor="red"
            position={[-4, 1, 1]}
            args={[1, 1, 1]}
            wobbleFactor={1.2}
            wobbleSpeed={1.1}
          />
          <CustomBox
            boxColor="green"
            position={[0, 1, 1]}
            args={[3, 2, 1]}
            wobbleFactor={0.6}
            wobbleSpeed={0.8}
          />
          <CustomBox
            boxColor="blue"
            position={[4, 1, 1]}
            args={[1, 1, 1]}
            wobbleFactor={1.2}
            wobbleSpeed={1.1}
          />
        </group>

        {/* <Box>
          <meshStandardMaterial attach="material" color="red" />
        </Box> */}
        <OrbitControls />
      </Canvas>
    </React.Fragment>
  );
};

export default Practice;

// <circleBufferGeometry attach="geometry" args={[1, 360]} /> // where args [size, number_of_angles]
