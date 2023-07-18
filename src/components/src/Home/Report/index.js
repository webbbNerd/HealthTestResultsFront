import React, { useEffect, useState, useRef } from "react";
import { Button } from "antd";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const { formdata } = useSelector((state) => ({
    formdata: state.formdata,
  }));
  // const dispatch = useDispatch();

  // const increment = () => {
  //   dispatch({ type: 'INCREMENT' });
  // };
  console.log(formdata, 'fprmmmmmmmmmmm');

  return <div>Report</div>;
}

export default Report;
