import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { fetchEventsExcel, fetchForTestEventView } from "../actions";
import DeviceTestEvents from "./deviceTestEvents";
import DeviceEvents from "./deviceEvents";
import NewTestEventModal from "./newTestEventModal";
import IncidentModal from "../incidentview";

const ListTestEvents = ({
  activeDevice,
  activeTest,
  devices,
  fetchEventsExcel,
  fetchForTestEventView,
  eventItem
}) => {

	const activeDeviceId = activeDevice == null ? null : activeDevice.deviceId;

  useEffect(() => {
     fetchForTestEventView(activeDeviceId, activeTest);
  }, [eventItem])

  const handleActiveDevice = (id) => {
    if (id !== "") {
      fetchForTestEventView(id, null)
    }
  }

  const handleTests = (test) => {
    const selection = test === "0" ? null : test;
    fetchForTestEventView(activeDeviceId, selection)
  }

  const handleEventsExcel = async (id, deviceName) => {
    await fetchEventsExcel(id, deviceName);
  };

  if (devices && devices.length > 0) {
    return (
      <>
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <Card.Title className="font-weight-bold">
                  Kirjattavat tulokset
                </Card.Title>
              </Col>
            </Row>
          </Card.Header>
        </Card>
        <div className="p-3">
          <Row>
            <Col xs={8}>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="3"><b>Valitse laite</b></Form.Label>
                  <Col sm="9">
                    <Form.Control
                      id="device-select"
                      as="select"
                      value={activeDeviceId}
                      defaultValue={null}
                      onChange={e => handleActiveDevice(e.target.value)}
                    >
                      {activeDevice === null && <option hidden></option>}
                      {devices.map(device => {
                        return (
                          <option key={device.deviceId} value={device.deviceId}>{device.name}</option>
                        )
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
            {activeDeviceId &&
              <Col xs={4}>
                <Button onClick={() => handleEventsExcel(activeDeviceId, activeDevice.name)}>
                  Lataa kirjatut tulokset
                </Button>
              </Col>
            }
          </Row>
          <Row>
            {activeDeviceId && activeDevice.tests.length > 0 ?
              <>
                <Col xs={8}>
                  <Form>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="3"><b>Valitse testi</b></Form.Label>
                      <Col sm="9">
                        <Form.Control id="test-select" as="select" value={activeTest !== null ? activeTest :0} defaultValue={0} onChange={e => handleTests(e.target.value)}>
                          <option value={0}>Vika- ja huoltomerkinnät</option>
                          {activeDevice.tests.map(test => {
                            return (
                              <option key={test.testId} value={test.testId}>{test.description}</option>
                            )
                          })}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>

                {activeTest <= 0 &&
                  <Col xs={4}>
                    <IncidentModal />
                  </Col>
                }
                {activeTest > 0 &&
                  <Col xs={4}>
                    <NewTestEventModal />
                  </Col>
                }
              </>
              : <></>
            }
          </Row >
          <Row>
            <DeviceTestEvents />
          </Row>
          {activeTest == null &&
            <>
              {activeDevice &&
                <Row><DeviceEvents /></Row>
              }
            </>
          }

        </div>
      </>
    );
  } else { return (<></>) }
};

const mapStateToProps = (state) => {
  if (state == null) {
    return { devices: [], tests: [], deviceTestEvents: [], error: null, events: [] };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventsExcel: (id, deviceName) => dispatch(fetchEventsExcel(id, deviceName)),
    fetchForTestEventView: (activeDevice, testId) => dispatch(fetchForTestEventView(activeDevice, testId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTestEvents);
