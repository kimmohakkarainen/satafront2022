import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import DeviceList from "./deviceList";
import DeviceInfo from "./deviceInfo";
import DeviceNew from "./deviceNew";

export default function DeviceView() {

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title className="font-weight-bold">
                Laitteet
              </Card.Title>
            </Col>
          </Row>
        </Card.Header>
      </Card>

      <div className="m-2">
        <DeviceNew />
        <Row>
          <Col sm={2}>
            <DeviceList />
          </Col>
          <Col className="mt-4" sm={10}>
            <DeviceInfo />
          </Col>
        </Row>
      </div>
    </>
  );
};

