import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import Request from "../../../../request";
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
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoader(true);
    // let { data, success, error, message } = await Request.submitForm({
    //   data: values,
    // });
    var success = true;
    if (success) {
      // console.log(data, "dataaaaaaaaaa");
      dispatch({ type: "setFormData", payload: values });
      notification.success({
        message: "message",
      });
      setTimeout(() => {
        navigate("/report");
      }, 0);
    } else {
      notification.error({
        message: "message",
      });
    }
    console.log("Success:", values);
    setLoader(false);
  };

  return (
    <>
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
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item label="HDL Cholesterol" name="hdlcholesterol">
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item label="VLDL" name="vldl">
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item label="LDL Cholesterol" name="ldlcholesterol">
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item label="Non-HDL Cholesterol" name="nonhdlcholesterol">
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item label="Triglycerides" name="triglycerides">
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item
            label="Total Cholesterol: HDL Ratio"
            name="totalcholesterolhdlratio"
          >
            <InputNumber min={1} max={300} />
          </Form.Item>
          <Form.Item label="TG: HDL ratio" name="tgratio">
            <InputNumber min={1} max={300} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default FormPage;
