import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import { Avatar, Skeleton, Switch, Button, Progress, notification } from "antd";
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
      title: "HDL Cholestero",
      dataIndex: "hdlcholesterol",
      key: "hdlcholesterol",
      high: 100,
      low: 40,
      normal: 60,
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
      title: "TG: HDL ratio",
      key: "tgratio",
      dataIndex: "tgratio",
      high: 4,
      normal: 2,
    },
    {
      title: "Total Cholesterol",
      dataIndex: "totalcholesterol",
      key: "totalcholesterol",
      high: 300,
      low: 50,
      normal: 200,
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
      title: "Triglycerides",
      key: "triglycerides",
      dataIndex: "triglycerides",
      high: 340,
      low: 50,
      normal: 190,
    },
    {
      title: "VLDL",
      dataIndex: "vldl",
      key: "vldl",
      high: 50,
      low: 2,
      normal: 30,
    },
  ];

  console.log(datasource);

  // const dataSource = {
  //   hdlcholesterol: 0,
  //   ldlcholesterol: 3,
  //   nonhdlcholesterol: 0,
  //   tgratio: 0,
  //   totalcholesterol: 23,
  //   totalcholesterolhdlratio: 23,
  //   triglycerides: 0,
  //   vldl: 300,
  // };

  useEffect(() => {
    apiFunction();
  }, []);

  return (
    <div style={{ width: "90vw", margin: "0 auto" }}>
      <div style={{ position: "relative", textAlign: "right" }}>
        <Button type="primary" onClick={() => navigate("/")} style={{}}>
          Go to List
        </Button>
      </div>
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
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "75%" }}>
              <p className="reportHeading">TestName</p>
            </div>
            <div style={{ width: "35%", textAlign: "center" }}>
              <p className="reportHeading">Result</p>
            </div>
          </div>
          <div style={{ width: "40%" }}>
            <p className="reportHeading">Range</p>
          </div>
        </div>

        {columns.map((column) => {
          const dataValue = datasource[column.dataIndex];
          const highValue = column.high;
          const normalValue = column.normal;
          const lowValue = column.low;

          let backColor = "#00dd0057"; // Default color

          // Condition to set the text color based on the specified conditions
          if (dataValue > normalValue || (lowValue && dataValue < lowValue)) {
            backColor = "#ff000036";
          } else if (
            lowValue &&
            dataValue > lowValue &&
            dataValue < normalValue
          ) {
            backColor = "#00dd0057";
          } else if (!lowValue && dataValue < normalValue) {
            backColor = "#00dd0057";
          }

          const lowest = column.low || 0;

          // const totalRange = highValue - lowest;
          // const normalRange = normalValue - lowest;
          // const highRange = highValue - normalValue;

          // const percentageLow = (normalRange / totalRange) * 100;
          // const percentageNormal = (highRange / totalRange) * 100;
          // const percentageHigh = 100 - percentageLow - percentageNormal;

          // Determine the color of each section based on the value
          // const getColor = (value) => {
          //   if (value > lowest && value < normalValue) {
          //     return "green";
          //   } else {
          //     return "red";
          //   }
          // };

          return (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "75%" }}>
                  <p className="titleName" style={{ background: backColor }}>
                    {column.title}
                  </p>
                </div>
                <div
                  style={{
                    width: "35%",
                    textAlign: "center",
                  }}
                >
                  <p className="titleName" style={{ background: backColor }}>
                    {datasource[column.dataIndex]} mg/dl
                  </p>
                </div>
              </div>
              <div style={{ width: "40%" }}>
                <p className="titlenameReport">
                  {datasource[column.dataIndex] > column.high
                    ? "High"
                    : datasource[column.dataIndex] < column.low
                    ? "Low"
                    : "Normal"}
                </p>
                {/* <div
                  style={{
                    display: "flex",
                    height: "30px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: `${percentageLow}%`,
                      backgroundColor: getColor(lowest),
                    }}
                  />
                  <div
                    style={{
                      width: `${percentageNormal}%`,
                      backgroundColor: getColor(normalValue),
                    }}
                  />
                  <div
                    style={{
                      width: `${percentageHigh}%`,
                      backgroundColor: getColor(highValue),
                    }}
                  />
                </div>
                <p>0</p>
                <p>{lowest}</p>
                <p>{normalValue}</p>
                <p>{highValue}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Report;
