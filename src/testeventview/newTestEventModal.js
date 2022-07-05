import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchForTestEventView, postTestEvent } from "../actions"
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";

const NewTestEventModal = ({
  activeDevice,
  activeTest,
  testTemplate,
  fetchForTestEventView,
  postTestEvent
}) => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false)

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setInputs({})
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

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      let tempTemplate = testTemplate
      tempTemplate.results.map((result) => {
        result.value = inputs[result.measurementId];
        return true;
      });
      tempTemplate.comments = inputs.comments;

      handleClose();
      setInputs({});

      postTestEvent(tempTemplate);

      fetchForTestEventView(activeDevice.deviceId, activeTest);
      setValidated(false)
      return
    }

    setValidated(true)
  };

  return (
    <>
      {
        (activeTest > 0 && testTemplate != null) && <Button id="add-testevent" onClick={handleShow}>Lisää tulos</Button>
      }

      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Lisää tulos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form id="test-event-form" onSubmit={e => handleSubmit(e)} noValidate validated={validated}>
                <Table borderless={true} id="measurement-table">
                  <thead>
                    <tr>
                      <td></td>
                      <td>
                        <b>Alaraja</b>
                      </td>
                      <td>
                        <b>Tulos</b>
                      </td>
                      <td>
                        <b>Yläraja</b>
                      </td>
                    </tr>
                  </thead>
                  {testTemplate && testTemplate.results !== undefined &&
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
                                      required
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
                                      required
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
          <Button id="measurement-accept" type="submit" form="test-event-form" className="m-2">
            Hyväksy
          </Button>
        </Modal.Body>
      </Modal >
    </>
  )
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTestEvent: (test) => dispatch(postTestEvent(test)),
    fetchForTestEventView: (activeDevice, testId) => dispatch(fetchForTestEventView(activeDevice, testId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTestEventModal)