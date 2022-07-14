import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchTaskList,
  fetchTestTemplate,
  postTestEvent,
  fetchTaskListExcel
} from "../actions";
/* import BootstrapTable from "react-bootstrap-table-next"; */
import TaskTable from "./tasktable";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";

import { WeekNumber } from "../utils/week.js";
import { FormatData } from "./formatData";
import { FilterData } from "./filterData";

let currentWeekNumber = require("current-week-number");

const TaskView = ({
  fetchTaskList,
  fetchTestTemplate,
  postTestEvent,
  tasklist,
  testTemplate,
  error,
  testEvent,
  fetchTaskListExcel
}) => {
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState();
  const [errorOccured, setErrorOccured] = useState(false);
  const [formattedData, setFormattedData] = useState(tasklist);
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    setErrorOccured(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchTaskList();
  }, [fetchTaskList, testEvent]);

  useEffect(() => {
    if (error) {
      setErrorOccured(true);
    }
  }, [error, errorOccured]);

  useEffect(() => {
    setFormattedData(FormatData(tasklist, filter));
  }, [tasklist, filter]);

  const columns = [
    {
      dataField: "name",
      text: "Laitteen nimi"
    },
    {
      dataField: "description",
      text: "Testi"
    },
    {
      dataField: "week1",
      text: `Viikko ${WeekNumber(new Date(), 0)}`
    },
    {
      dataField: "week2",
      text: `Viikko ${WeekNumber(new Date(), 1)}`
    },
    {
      dataField: "week3",
      text: `Viikko ${WeekNumber(new Date(), 2)}`
    },
    {
      dataField: "week4",
      text: `Viikko ${WeekNumber(new Date(), 3)}`
    },
    {
      dataField: "week5",
      text: `Viikko ${WeekNumber(new Date(), 4)}`
    }
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      if (row.testId !== -1) {
        fetchTestTemplate(row.testId);
        handleShow();
      }
    }
  };

  const rowStyle = (row) => {
    const style = {};
    if (row.testId < 0) {
      style.backgroundColor = "rgba(0,0,0,.075)";
      style.fontWeight = "bold";
    } else {
      style.backgroundColor = "transparent";
    }

    tasklist.map((tl) => {
      if (row.name === tl.name) {
        tl.tests.map((test) => {
          if (test.withinSet === false) {
            style.color = "#f5c242";
          }
          if (test.withinAcceptance === false) {
            style.color = "red";
          }
        });
      } else if (row.name === "") {
        tl.tests.map((test) => {
          if (row.testId === test.testId) {
            if (test.withinSet === false) {
              style.color = "#f5c242";
            }
            if (test.withinAcceptance === false) {
              style.color = "red";
            }
          }
        });
      }
    });

    return style;
  };

  const handleInput = (e, measurementId) => {
    let i = inputs;
    i[measurementId] = e.target.value;
    setInputs(i);
  };

  const handleBoolInput = (e, measurementId) => {
    let i = inputs;
    i[measurementId] = e.target.value;
    setInputs(i);
  };

  const handleComment = (e) => {
    let i = inputs;
    i = { ...i, comments: e.target.value };
    setInputs(i);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      testTemplate.results.map((result) => {
        result.value = inputs[result.measurementId];
        return true;
      });
      testTemplate.comments = inputs.comments;

      postTestEvent(testTemplate);

      handleClose();
      setInputs({});
      setValidated(false);
      return;
    }

    setValidated(true);
  };

  const handleTaskListExcelClick = () => {
    fetchTaskListExcel({
      devices: filter
    });
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title className="font-weight-bold">Työlista</Card.Title>
            </Col>
          </Row>
        </Card.Header>
      </Card>

      <Row className="p-2">
        <Col xs={4}>
          <FilterData
            tasklist={tasklist}
            filter={filter}
            setFilter={setFilter}
          />
        </Col>
        <Col xs={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{ marginLeft: "auto", height: "40px" }}
            onClick={() => handleTaskListExcelClick()}
          >
            Lataa työlista
          </Button>
        </Col>
      </Row>

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
                                              handleInput(
                                                e,
                                                result.measurementId
                                              )
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

      <TaskTable
        keyField="id"
        data={formattedData}
        columns={columns}
        rowEvents={rowEvents}
        rowStyle={rowStyle}
        hover
        noDataIndication="Työlista on tyhjä"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  if (state === null) {
    return { devices: [], tests: [], testTemplate: [], error: null };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTaskList: () => dispatch(fetchTaskList()),
    postTestEvent: (test) => dispatch(postTestEvent(test)),
    fetchTestTemplate: (id) => dispatch(fetchTestTemplate(id)),
    fetchTaskListExcel: (devices) => dispatch(fetchTaskListExcel(devices))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
