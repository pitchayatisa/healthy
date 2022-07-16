import React, { useState } from "react";
import { Row, Col, Typography, Form, Input, Button, Card } from "antd";

import { useRouter } from "next/router";
import descriptionBMI from "../../src/const/descriptionBMI";
import menu from "../../src/const/menus";

const { Title } = Typography;

const Calculators = () => {
  const router = useRouter();
  const [totalBMI, setTotalBMI] = useState();
  const [sex, setSex] = useState("male");
  const [totalBMR, setTotalBMR] = useState(0);
  const [open, setOpen] = useState("BMI");

  const onFinishBMI = (values) => {
    const total = values.weight / ((values.height / 100) * 2);
    setTotalBMI(parseFloat(total).toFixed(2));
  };

  const onFinishBMR = (values) => {
    // BMR สำหรับผู้ชาย = 66 + (13.7 x น้ำหนักตัว (กิโลกรัม))+(5 x ส่วนสูง (เซนติเมตร))-(6.8 x อายุ)
    // BMR สำหรับผู้หญิง = 665 + (9.6 x น้ำหนักตัว (กิโลกรัม))+(1.8 x ส่วนสูง (เซนติเมตร))-(4.7 x อายุ)
    let totalBMR = 0;
    if (sex === "male") {
      totalBMR =
        66 + 13.7 * values.weight + 5 * values.height - 6.8 * values.age;
    } else {
      totalBMR =
        665 + 9.6 * values.weight + 1.8 * values.height - 4.7 * values.age;
    }
    setTotalBMR(Math.ceil(totalBMR));
  };

  const onSelectSex = (type) => {
    setSex(type);
  };

  const onSelectCalculator = (menus) => {
    setOpen(menus);
  };

  return (
    <div className="container">
      <Row justify="end">
        {menu.map((value, index) => (
          <Col key={index}>
            <Title
              onClick={() => router.push(`${value.path}`)}
              key={index}
              level={4}
              className={
                router.pathname === "/calculators" && index === 1
                  ? "text-menu-active"
                  : "text-menu"
              }
            >
              {value.title}
            </Title>
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Col>
          <Title
            level={4}
            className={open === "BMI" ? "title-bmi-active" : "title-bmi"}
            onClick={() => onSelectCalculator("BMI")}
          >
            BMI
          </Title>
        </Col>
        <Col>
          <Title
            level={4}
            className={open === "BMR" ? "title-bmi-active" : "title-bmi"}
            onClick={() => onSelectCalculator("BMR")}
          >
            BMR
          </Title>
        </Col>
      </Row>

      {open === "BMI" && (
        <Row gutter={40} className="form-calculator" justify="center">
          <Col lg={8}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinishBMI}
              autoComplete="off"
            >
              <Form.Item
                label="Weight (kg.)"
                name="weight"
                rules={[
                  { required: true, message: "Please input your weight!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Height (cm.)"
                name="height"
                rules={[
                  { required: true, message: "Please input your height!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Button className="btn-cal" htmlType="submit">
                Calculate
              </Button>
            </Form>
          </Col>
          <Col lg={15}>
            <Title level={2} className="">
              BMI: {totalBMI}
            </Title>
            <Card className="card-bmi">
              <Row>
                <Col lg={8}>
                  <Title level={4}>BMI kg/m2</Title>
                </Col>
                <Col lg={8}>
                  <Title level={4}>อยู่ในเกณท์</Title>
                </Col>
                <Col lg={8}>
                  <Title level={4}>ภาวะเสี่ยงต่อโรค</Title>
                </Col>
              </Row>
              {descriptionBMI.map((value, index) => (
                <Row
                  className={
                    totalBMI < 18.5 && index === 0
                      ? "active-bmi"
                      : totalBMI >= 18.5 && totalBMI <= 22.99 && index === 1
                      ? "active-bmi"
                      : totalBMI >= 23 && totalBMI <= 24.99 && index === 2
                      ? "active-bmi"
                      : totalBMI >= 25 && totalBMI <= 29.99 && index === 3
                      ? "active-bmi"
                      : totalBMI >= 30 && index === 4
                      ? "active-bmi"
                      : "row-bmi"
                  }
                  key={index}
                >
                  <Col lg={8}>
                    <div className="text-bmi">{value.bmi}</div>
                  </Col>
                  <Col lg={8}>
                    <div className="text-bmi">{value.standard}</div>
                  </Col>
                  <Col lg={8}>
                    <div className="text-bmi">{value.risk}</div>
                  </Col>
                </Row>
              ))}
            </Card>
          </Col>
        </Row>
      )}

      {open === "BMR" && (
        <Row gutter={40} className="form-calculator" justify="center">
          <Col lg={10}>
            <Row gutter={20}>
              <Col lg={12}>
                <Card
                  className={sex === "male" ? "card-bmr-active" : "card-bmr"}
                  onClick={() => onSelectSex("male")}
                >
                  <div>ผู้ชาย</div>
                </Card>
              </Col>
              <Col lg={12}>
                <Card
                  className={sex === "female" ? "card-bmr-active" : "card-bmr"}
                  onClick={() => onSelectSex("female")}
                >
                  <div>ผู้หญิง</div>
                </Card>
              </Col>
            </Row>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinishBMR}
              autoComplete="off"
            >
              <Row gutter={20}>
                <Col lg={12}>
                  <Form.Item
                    label="Weight (kg.)"
                    name="weight"
                    rules={[
                      { required: true, message: "Please input your weight!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item
                    label="Height (cm.)"
                    name="height"
                    rules={[
                      { required: true, message: "Please input your height!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Please input your age!" }]}
              >
                <Input />
              </Form.Item>

              <Button className="btn-cal" htmlType="submit">
                Calculate
              </Button>
            </Form>
          </Col>
          <Col lg={13}>
            <Title level={2} className="">
              BMR: {totalBMR} (kcal)
            </Title>
            <Card className="card-bmi">
              <Row>
                <Col lg={24}>
                  <Title level={5}>
                    BMR ย่อมาจาก Basal Metabolic Rate
                    หรือเราสามารถเรียกได้ว่าเป็นอัตราการเผาผลาญพลังงานในแต่ละวัน
                    โดยค่าพลังงานนี้ร่างกายจะใช้ในการขับเคลื่อนระบบเเละควบคุมอวัยวะต่างๆ
                    ในร่างกายค่ะ เรามาหาค่าพลังงานที่ใช้ในส่วนนี้กันก่อนค่ะ
                    โดยการกรอกข้อมูลในเครื่องคำนวณด้านซ้ายค่ะ
                  </Title>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Calculators;
