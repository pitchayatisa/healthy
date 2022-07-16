import React, { useState } from "react";
import { Row, Col, Typography, Divider, Badge } from "antd";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";
import healths from "../../src/const/healths";
import menu from "../../src/const/menus";
import settings from "../../src/const/settingSlider";

const { Title, Text } = Typography;

const Healthy = () => {
  const router = useRouter();

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
      <Row justify="center" className="row-title-foods">
        <Col>
          <Title level={4} className="title-foods">
            สาระความรู้ด้านสุขภาพและการลดน้ำหนัก
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Slider {...settings}>
            {healths.map((menus, index) => (
              // <div className="box-slide" key={index}>
              <div
                key={index}
                className="card-slide-health"
                onClick={() => {
                  router.push({
                    pathname: "/healthy/[id]",
                    query: { id: menus.id },
                  });
                }}
              >
                <Image
                  className="img-health"
                  src={menus.img}
                  alt=""
                  width={280}
                  height={200}
                  layout="responsive"
                  objectFit="cover"
                />
                <Title level={5} className="title-health">
                  {menus.title}
                </Title>
                <Row className="row-description-health">
                  <Title level={5} className="text-health">
                    {menus.subTitle}
                  </Title>
                </Row>
              </div>
              // </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </div>
  );
};

export default Healthy;
