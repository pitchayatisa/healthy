import React, { useState} from "react";
import { Row, Col, Layout, Typography, Divider, Badge } from "antd";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";
import menu from '../../src/const/menus'
import settings from '../../src/const/settingSlider'
import foods from '../../src/const/foods'

const { Title, Text } = Typography;

const Calories = () => {
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
              className={router.pathname === '/calories' && index === 0 ? "text-menu-active": "text-menu"}
            >
              {value.title}
            </Title>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Slider {...settings}>
            {foods.map((menus, index) => (
              <div className="box-slide" key={index}>
                <Image
                  className="img-foods"
                  src={menus.img}
                  alt=""
                  width={150}
                  height={150}
                />
                <div key={index} className="card-slide">
                  <Title level={4} className="text-foods">
                    {menus.title}
                  </Title>
                  <Row justify="space-around">
                    <Divider className="divider" />
                    <Text className="text-description-foods">
                      {menus.calories}
                    </Text>
                    <Badge
                      color="#f50"
                      text={
                        <Text className="text-description-foods">
                          {menus.person}
                        </Text>
                      }
                    />
                    <Divider className="divider" />
                  </Row>
                  <Row justify="end">
                    <Title level={4} className="text-calories">
                      {menus.price}
                    </Title>
                  </Row>
                </div>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </div>
  );
};

export default Calories;
