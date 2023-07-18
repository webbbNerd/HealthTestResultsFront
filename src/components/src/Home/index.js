import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import List from "./List/index";

// const Container = styled.div`
//   height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;

function Home() {
  return (
    <div>
      <List />
    </div>
  );
}

export default Home;
