import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import styles from "./Earth.module.scss";
import EarthModel from "./components/EarthModel";
import { usePosition } from "./hooks/usePosition";

const LOCATIONS = [
  {
    id: 1,
    text: "Mumbai",
    latitude: 19.076,
    longitude: 72.8777,
  },
  {
    id: 2,
    text: "New York",
    latitude: 40.73061,
    longitude: -73.935242,
  },
  {
    id: 3,
    text: "Amsterdam",
    latitude: 52.3676,
    longitude: 4.9041,
  },
  {
    id: 4,
    text: "London",
    latitude: 51.5072,
    longitude: 0.1276,
  },
  {
    id: 5,
    text: "Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 6,
    text: "Toronto",
    latitude: 43.65107,
    longitude: -79.347015,
  },
];

const Earth = () => {
  const { latitude, longitude, error } = usePosition();
  const [location, setLocation] = useState({
    latitude,
    longitude,
  });

  const [isZoomed, setIsZoomed] = React.useState(false);

  useEffect(() => {
    setLocation({
      latitude,
      longitude,
    });
  }, [latitude, longitude]);

  const allLocations = [
    {
      id: "me",
      longitude,
      latitude,
      text: "My Location",
    },
    ...LOCATIONS,
  ];

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          width: 300,
          zIndex: 5000,
          backgroundColor: "white",
        }}
      >
        <ul>
          <li>Click On a location to go to</li>
          <li>Click on Globe to zoom in</li>
          <li>Drag to move the globe</li>
          <li>Scroll to zoom in and out of the globe</li>
        </ul>
        {allLocations.map((location) => (
          <button
            key={location.id}
            style={{ padding: 4, margin: 8 }}
            onClick={() => {
              setLocation({
                latitude: location.latitude,
                longitude: location.longitude,
              });
              setIsZoomed(true);
            }}
          >
            Go to {location.text}
          </button>
        ))}
      </div>
      <Canvas
        className={styles.container}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <Stars speed={2} factor={3.5} />
        {/* Use the earth gltf generated model, generated using */}
        <EarthModel
          coordinates={location}
          isZoomed={isZoomed}
          setIsZoomed={setIsZoomed}
        />
        {/* pointLight from left side */}
        <ambientLight intensity={1} />
        {/* <pointLight intensity={1.5} position={[-20, 0, -2]} /> */}
        <pointLight />
        <OrbitControls />
      </Canvas>
    </React.Fragment>
  );
};

export default Earth;

// skfb.ly/6U8BH
// skfb.ly/6WXnK
// npx gltfjsx earth/earth.gltf
