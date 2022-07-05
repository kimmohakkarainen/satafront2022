import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTestEvent } from "../actions"
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import moment from "moment"

const DeviceTestEvents = ({
  testEvent,
  testTemplate,
  updateTestEvent
}) => {
  const [show, setShow] = useState(false)
  const [inputs, setInputs] = useState({});
  const today = new Date().toISOString().substring(0, 10)

  const handleUpdate = (dteInputs) => {
    let tempTemplate = testTemplate
    tempTemplate.results.map((result) => {
      result.value = dteInputs[result.measurementId];
      return true;
    });
    tempTemplate.comments = dteInputs.comments;
    tempTemplate.testEventId = dteInputs.testEventId;
    updateTestEvent(tempTemplate);
  }

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = (tEventId) => {
    let i = inputs
    i = { ...i, testEventId: tEventId }
    setInputs(i)
    setShow(true)
  }

  const handleInput = (e, measurementId) => {
    let i = inputs;
    i[measurementId] = e.target.value;
    setInputs(i);
  };

  const handleBoolInput = (e, measurementId) => {
    let i = inputs;
    i[measurementId] = e.target.value;
    setInputs(i);
  }

  const handleComment = (e) => {
    let i = inputs;
    i = { ...i, comments: e.target.value };
    setInputs(i);
  };

  return (
    <>

      {testEvent !== undefined && testEvent.length > 0 ? (
        <>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Päiväys</th>
                <th>Kommentti</th>
                {testEvent[testEvent.length - 1].results.map(result => {
                  return (
                    <th>{result.description}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {testEvent.map((testEvent) => {
                return (
                  <tr key={testEvent.testEventId}>
                    {today === testEvent.date ?
                      <td>
                        <Button onClick={() => handleShow(testEvent.testEventId)}>Muuta</Button> {moment(testEvent.date).format("DD.MM.YYYY")}
                      </td>
                      : <td>{moment(testEvent.date).format("DD.MM.YYYY")}</td>
                    }

                    <td>{testEvent.comments}</td>
                    {testEvent.results.map((result) => {
                      if (result.unit !== "totuusarvo") {
                        return (
                          <td>{result.value} {result.unit}</td>
                        )
                      } else {
                        return (
                          <td>{result.value === 1 ? "Kyllä" : "Ei"}</td>
                        )
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Muokkaa mittausta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form id="test-event-form" onSubmit={handleUpdate}>
                    <Table borderless={true}>
                      <thead>
                        <tr>
                          <td></td>
                          <td>
                            <b>Alaraja</b>
                          </td>
                          <td>
                            <b>Mittaus</b>
                          </td>
                          <td>
                            <b>Yläraja</b>
                          </td>
                        </tr>
                      </thead>
                      {testTemplate !== null &&
                        testTemplate.results.filter(r => r.disabled !== true).map((result, i) => {
                          return (
                            <tbody>
                              <tr>
                                {result.unit !== "totuusarvo" ?
                                  <>
                                    <td>{result.description}</td>
                                    <td>{result.setLimitLow} {result.unit}</td>
                                    <td>
                                      <Form.Group>
                                        <Form.Control
                                          id={`measurement-${i}`}
                                          type="number"
                                          step="any"
                                          onChange={(e) => handleInput(e, result.measurementId)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          Anna ominaisuuden tulos
                                        </Form.Control.Feedback>
                                      </Form.Group>
                                    </td>
                                    <td>{result.setLimitHigh} {result.unit}</td>
                                  </>
                                  :
                                  <>
                                    <td>{result.description}</td>
                                    <td>{result.unit}</td>
                                    <td>
                                      <Form.Group>
                                        <Form.Control
                                          id={`measurement-${i}`}
                                          as="select"
                                          defaultValue={null}
                                          onChange={(e) => handleBoolInput(e, result.measurementId)}
                                        >
                                          <option value={null} hidden />
                                          <option value={1}>Kyllä</option>
                                          <option value={-1}>Ei</option>
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                          Anna ominaisuuden tulos
                                        </Form.Control.Feedback>
                                      </Form.Group>
                                    </td>
                                    <td></td>
                                  </>
                                }
                              </tr>
                            </tbody>
                          )
                        })
                      }
                    </Table>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col className="ml-2" xs={2}>
                  <div>
                    <b>Lisää kommentti</b>
                  </div>
                </Col>
                <Col xs={6}>
                  <textarea
                    id="measurement-text"
                    onChange={(e) => handleComment(e)}
                    style={{ resize: "both" }}
                  />
                </Col>
              </Row>
              <Button id="measurement-accept" onClick={() => { handleUpdate(inputs); handleClose() }} className="m-2">
                Hyväksy
              </Button>
            </Modal.Body>
          </Modal>

        </>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTestEvent: (test) => dispatch(updateTestEvent(test))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTestEvents)
