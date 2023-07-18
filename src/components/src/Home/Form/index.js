import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
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

function FormPage() {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    let { data, success, error, message } = await Request.submitForm({
      data: values,
    });
    if (success) {
      console.log(data, "dataaaaaaaaaa")
      notification.success({
        message: message,
      });
    } else {
      notification.error({
        message: message,
      });
    }
    console.log("Success:", values);
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
