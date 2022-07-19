import React, { useEffect } from "react";
import { Modal, Form, Button, Table, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchTestTemplate } from "../actions";

function TestEventModal({
  show,
  handleClose,
  testTemplate,
  handleInput,
  handleBoolInput,
  handleComment,
  handleSubmit,
  fetchTestTemplate
}) {
  const validated = true;

  useEffect(() => {
    if (show === null) {
      /* do nothing */
    } else {
      fetchTestTemplate(show);
    }
  }, [show, fetchTestTemplate]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Lisää mittaus</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {testTemplate !== null &&
        testTemplate.results !== undefined &&
        testTemplate.results.length > 0 ? (
          <>
            <Row>
              <Col>
                <Form
                  id="test-event-form"
                  onSubmit={(e) => handleSubmit(e)}
                  noValidate
                  validated={validated}
                >
                  <Table borderless={true}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Alaraja</th>
                        <th>Mittaus</th>
                        <th>Yläraja</th>
                      </tr>
                    </thead>
                    <tbody id="measurements-table">
                      {testTemplate !== null &&
                        testTemplate.results !== undefined &&
                        testTemplate.results
                          .filter((r) => r.disabled !== true)
                          .map((result, i) => {
                            return (
                              <tr>
                                {result.unit !== "totuusarvo" ? (
                                  <>
                                    <td>{result.description}</td>
                                    <td>
                                      {result.setLimitLow} {result.unit}
                                    </td>
                                    <td>
                                      <Form.Group>
                                        <Form.Control
                                          id={`measurement-${i}`}
                                          type="number"
                                          step="any"
                                          onChange={(e) =>
                                            handleInput(e, result.measurementId)
                                          }
                                          required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          Anna ominaisuuden tulos
                                        </Form.Control.Feedback>
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {result.setLimitHigh} {result.unit}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>{result.description}</td>
                                    <td>{result.unit}</td>
                                    <td>
                                      <Form.Group>
                                        <Form.Control
                                          id={`measurement-${i}`}
                                          as="select"
                                          defaultValue={null}
                                          onChange={(e) =>
                                            handleBoolInput(
                                              e,
                                              result.measurementId
                                            )
                                          }
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
                                )}
                              </tr>
                            );
                          })}
                    </tbody>
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
                  id="measurement-textarea"
                  onChange={(e) => handleComment(e)}
                  style={{ resize: "both" }}
                />
              </Col>
            </Row>
            <Button
              id="measurement-btn"
              type="submit"
              form="test-event-form"
              className="m-2"
            >
              Hyväksy
            </Button>
          </>
        ) : (
          <div>
            <i>Testillä ei ole ominaisuuksia</i>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  if (state === null) {
    return { devices: [], tests: [], testTemplate: [], error: null };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTestTemplate: (id) => dispatch(fetchTestTemplate(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestEventModal);
