import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Tag, Button, notification } from "antd";
import "./styles.css";
import Request from "../../../../request";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function List() {
  const navigate = useNavigate();
  const { formdata } = useSelector((state) => ({
    formdata: state.formdata,
  }));
  const [datasource, setDataSource] = useState([]);
  const [loader, setLoader] = useState(true);

  // const dispatch = useDispatch();

  // const increment = () => {
  //   dispatch({ type: 'INCREMENT' });
  // };

  const apiFunction = async () => {
    setLoader(true);
    let { data, success, error, message } = await Request.listForm();
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

  useEffect(() => {
    apiFunction();
  }, []);

  const handleReportSee = async (id) => {
    navigate(`/report/${id}`);
  };
  const handleReportEdit = () => {};
  const handleReportDelete = async (id) => {
    setLoader(true);
    let { data, success, error, message } = await Request.deleteForm(id);
    if (success) {
      notification.success({
        message: message || "Report Deleted Successfully",
      });
      apiFunction();
    } else {
      notification.error({
        message: message || "Some Error Occured",
      });
    }
    setLoader(false);
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Total Cholesterol",
      dataIndex: "totalcholesterol",
      key: "totalcholesterol",
    },
    {
      title: "HDL Cholestero",
      dataIndex: "hdlcholesterol",
      key: "hdlcholesterol",
    },
    {
      title: "VLDL",
      dataIndex: "vldl",
      key: "vldl",
    },
    {
      title: "LDL Cholesterol",
      key: "ldlcholesterol",
      dataIndex: "ldlcholesterol",
    },
    {
      title: "Non-HDL Cholesterol",
      key: "nonhdlcholesterol",
      dataIndex: "nonhdlcholesterol",
    },
    {
      title: "Triglycerides",
      key: "triglycerides",
      dataIndex: "triglycerides",
    },
    {
      title: "Total Cholesterol: HDL Ratio",
      key: "totalcholesterolhdlratio",
      dataIndex: "totalcholesterolhdlratio",
    },
    {
      title: "TG: HDL ratio",
      key: "tgratio",
      dataIndex: "tgratio",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleReportSee(record._id);
            }}
          >
            See Report
          </a>
          <a
            onClick={() => {
              handleReportEdit(record._id);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              handleReportDelete(record._id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: "90vw", margin: "0 auto" }}>
      <div style={{ position: "relative", textAlign: "right" }}>
        <Button type="primary" onClick={() => navigate("/form")} style={{}}>
          Create Report
        </Button>
      </div>
      <div>
        <h1>Reports</h1>
        {datasource ? (
          <Table loading={loader} columns={columns} dataSource={datasource} />
        ) : (
          <h3 className="h3Reports">You don't have any Reports Yet</h3>
        )}
      </div>
    </div>
  );
}

export default List;
