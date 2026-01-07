import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Shadow } from "@react-three/drei";
import { DoubleSide, ShadowMapType } from "three";

const SpinningMesh = ({ position, args, color }) => {
  const meshRef = useRef();
  // useFrame helps us to re-render based on movements
  useFrame(() => {
    meshRef.current.rotation.x = meshRef.current.rotation.x + 0.01;
    meshRef.current.rotation.y = meshRef.current.rotation.y + 0.01;
  });

  return (
    <mesh castShadow ref={meshRef} position={position}>
      {/* <circleBufferGeometry attach="geometry" args={[1, 360]} /> */}
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" side={DoubleSide} color={color} />
    </mesh>
  );
};

function Page() {
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          // shadowMapWidth={1024}
          // shadowMapHeight={1024}
          // shadowCameraFar={50}
          // shadowCameraLeft={-10}
          // shadowCameraRight={10}
          // shadowCameraTop={10}
          // shadowCameraBottom={-10}
          shadow-mapSize-shadowMap-width={1024}
          shadow-mapSize-shadowMap-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          // shadow={{
          //   mapSize: {
          //     width: 1024,
          //     height: 1024,
          //   },
          //   camera: {
          //     far: 50,
          //     left: -10,
          //     right: 10,
          //     top: 10,
          //     bottom: -10,
          //   },
          // }}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            {/* <meshStandardMaterial attach="material" color="yellow" /> */}
            <shaderMaterial attach="material" />
          </mesh>
        </group>

        <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color="red" />
        <SpinningMesh position={[-2, 1, -5]} args={[1, 1, 1]} color="green" />
        <SpinningMesh position={[5, 1, -2]} args={[1, 1, 1]} color="blue" />
        {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}
      </Canvas>
    </>
  );
}

export default Page;

// height, width, depth - geometry args

{
  /* <mesh>
  <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
  <meshStandardMaterial attach="material" />
</mesh> */
}

// similar to

{
  /* <Box>
  <meshStandardMaterial attach="material" />
</Box> */
}

// ambient light always gives equal light to all the Object, doesn't have any shadows
