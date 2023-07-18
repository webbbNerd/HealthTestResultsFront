import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();
  // const count = useSelector(state => state.count);
  // const dispatch = useDispatch();

  // const increment = () => {
  //   dispatch({ type: 'INCREMENT' });
  // };

  return (
    <div>
      <h3>You don't have any Reports</h3>
      <Button onClick={() => navigate("/form")} style={{}}>
        Create Report
      </Button>
    </div>
  );
}

export default List;
