import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <div>
          <h2>3D Demos</h2>
          <div>
            <Link to="/wobble">Rotating Objects</Link>
            <br />
            <Link to="/earth">Orbit with Earth Model</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
