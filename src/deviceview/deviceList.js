import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, FormGroup, FormLabel, Table } from "react-bootstrap";

import { searchDevice } from "../actions";

const DeviceList = ({
  devices,
  activeDevice,
  activeTest,
  searchParams,
  searchDevice
}) => {
  const deviceId = activeDevice == null ? null : activeDevice.deviceId;
  const testId = activeTest == null ? null : activeTest.testId;
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    searchDevice(deviceId, testId, searchParams);
  });

  useEffect(() => {
    const timeOutId = setTimeout(
      () => searchDevice(deviceId, testId, searchTerm),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [searchTerm, searchDevice, deviceId, testId]);

  const handleActiveDevice = (id) => {
    searchDevice(id, null, searchParams);
  };

  return (
    <>
      <Form>
        <Row className="align-items-center">
          <Col sm={12}>
            <FormGroup>
              <FormLabel className="font-weight-bold">Haku</FormLabel>
              <Form.Control
                id="input-search-device"
                name="device"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          maxHeight: "65vh",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        <Table bordered hover>
          <thead>
            <tr key={0}>
              <th>Laitteen nimi</th>
            </tr>
          </thead>
          <tbody id="table-devices">
            {devices.map((device, index) => {
              return (
                <tr key={device.deviceId}>
                  <td
                    id={`deviceList-${index}`}
                    onClick={(e) => {
                      handleActiveDevice(device.deviceId);
                    }}
                  >
                    {device.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  if (state == null || state.devices == null) {
    return { devices: [] };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchDevice: (deviceId, testId, searchParams) =>
      dispatch(searchDevice(deviceId, testId, searchParams))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceList);
