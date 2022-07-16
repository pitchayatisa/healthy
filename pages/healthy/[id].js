import React from "react";
import { Row, Col, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import healths from "../../src/const/healths";
import menu from "../../src/const/menus";

const { Title, Text } = Typography;

const HealthyDescription = () => {
  const router = useRouter();
  const { id } = router.query;

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
                router.pathname === "/healthy" && index === 2
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
        {healths
          .filter((item) => item.id == id)
          .map((menus, index) => (
            <Col key={index} className="col-health">
              <Image
                className="img-health-id"
                src={menus.img}
                alt=""
                width={330}
                height={300}
                objectFit="cover"
              />
              <Title level={4} className="title-health-id">
                {menus.title}
              </Title>
              <Row className="">
                <Title level={5} className="text-health-id">
                  {menus.description}
                </Title>
              </Row>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default HealthyDescription;
