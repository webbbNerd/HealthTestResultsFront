import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import Request from "../../../../request";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = async (values) => {
    if (id) {
      setLoader(true);
      let { data, success, error, message } = await Request.updateForm(
        {
          ...values,
        },
        id
      );
      if (success) {
        notification.success({
          message: message || "Report Updated Successfully",
        });
      } else {
        notification.error({
          message: message || "Some Error Occured",
        });
      }
      setLoader(false);
    } else {
      setLoader(true);
      let { data, success, error, message } = await Request.submitForm({
        ...values,
      });
      if (success) {
        notification.success({
          message: message || "Report Added Successfully",
        });
        setTimeout(() => {
          navigate(`/report/${data._id}`);
        }, 0);
      } else {
        notification.error({
          message: message || "Some Error Occured",
        });
      }
      setLoader(false);
    }
  };

  const apiFunction = async () => {
    setLoader(true);
    let { data, success, error, message } = await Request.fetchReport(id);
    if (success) {
      form.setFieldsValue(data);
    } else {
      notification.error({
        message: message || "Some Error Occured",
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    if (id) {
      apiFunction();
    }
  }, [id]);

  return (
    <div style={{ width: "90vw", margin: "0 auto" }}>
      <div style={{ position: "relative", textAlign: "right" }}>
        <Button type="primary" onClick={() => navigate("/")} style={{}}>
          Go to List
        </Button>
      </div>
      <h1>Form</h1>
      <div className="formofhealth">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Total Cholesterol" name="totalcholesterol">
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item label="HDL Cholesterol" name="hdlcholesterol">
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item label="VLDL" name="vldl">
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item label="LDL Cholesterol" name="ldlcholesterol">
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item label="Non-HDL Cholesterol" name="nonhdlcholesterol">
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item label="Triglycerides" name="triglycerides">
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item
            label="Total Cholesterol: HDL Ratio"
            name="totalcholesterolhdlratio"
          >
            <InputNumber min={0} max={300} />
          </Form.Item>
          <Form.Item label="TG: HDL ratio" name="tgratio">
            <InputNumber min={0} max={300} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default FormPage;
