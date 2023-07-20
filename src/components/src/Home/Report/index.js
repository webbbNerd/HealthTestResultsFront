import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import { Avatar, Skeleton, Switch, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Request from "../../../../request";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const { formdata } = useSelector((state) => ({
    formdata: state.formdata,
  }));
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [datasource, setDataSource] = useState([]);

  const apiFunction = async () => {
    setLoader(true);
    let { data, success, error, message } = await Request.fetchReport(id);
    if (success) {
      setDataSource(data);
    } else {
      notification.error({
        message: message || "Some Error Occured",
      });
      setDataSource(null);
    }
    setLoader(false);
  };

  const columns = [
    {
      title: "Total Cholesterol",
      dataIndex: "totalcholesterol",
      key: "totalcholesterol",
      high: 300,
      low: 50,
      normal: 200,
    },
    {
      title: "HDL Cholestero",
      dataIndex: "hdlcholesterol",
      key: "hdlcholesterol",
      high: 100,
      low: 40,
      normal: 60,
    },
    {
      title: "VLDL",
      dataIndex: "vldl",
      key: "vldl",
      high: 50,
      low: 2,
      normal: 30,
    },
    {
      title: "LDL Cholesterol",
      key: "ldlcholesterol",
      dataIndex: "ldlcholesterol",
      high: 200,
      normal: 100,
    },
    {
      title: "Non-HDL Cholesterol",
      key: "nonhdlcholesterol",
      dataIndex: "nonhdlcholesterol",
      high: 260,
      normal: 130,
    },
    {
      title: "Triglycerides",
      key: "triglycerides",
      dataIndex: "triglycerides",
      high: 340,
      low: 50,
      normal: 190,
    },
    {
      title: "Total Cholesterol: HDL Ratio",
      key: "totalcholesterolhdlratio",
      dataIndex: "totalcholesterolhdlratio",
      high: 9.9,
      low: 3.3,
      normal: 4.4,
    },
    {
      title: "TG: HDL ratio",
      key: "tgratio",
      dataIndex: "tgratio",
      high: 4,
      normal: 2,
    },
  ];

  console.log(datasource);

  const dataSource = {
    hdlcholesterol: 0,
    ldlcholesterol: 3,
    nonhdlcholesterol: 0,
    tgratio: 0,
    totalcholesterol: 23,
    totalcholesterolhdlratio: 23,
    triglycerides: 0,
    vldl: 300,
  };

  useEffect(() => {
    apiFunction();
  }, []);

  return (
    <div>
      <h1>Report</h1>
      <div
        style={{
          width: "90vw",
          marginTop: 16,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "75%" }}>
              <p className="reportHeading">TestName</p>
              <p>NameTotal colestrol</p>
            </div>
            <div style={{ width: "25%", textAlign: "center" }}>
              <p className="reportHeading">Result</p>
              <p>330 mg/dl</p>
            </div>
          </div>
          <div style={{ width: "40%" }}>
            <p className="reportHeading">Range</p>
            <p>red</p>
          </div>
        </div>

        {columns.map((column) => (
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                width: "60%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "75%" }}>
                <p>{column.title}</p>
              </div>
              <div style={{ width: "25%", textAlign: "center" }}>
                <p>{dataSource[column.dataIndex]} mg/dl</p>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <p>
                {dataSource[column.dataIndex] > column.high
                  ? "High"
                  : dataSource[column.dataIndex] < column.low
                  ? "Low"
                  : "Normal"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;
