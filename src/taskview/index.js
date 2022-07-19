import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchTaskList,
  fetchTestTemplate,
  postTestEvent,
  fetchTaskListExcel
} from "../actions";
import TaskTable from "./tasktable";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";

import { WeekNumber } from "../utils/week.js";
import { FormatData } from "./formatData";
import { FilterData } from "./filterData";
import TestEventModal from "./testeventmodal";

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
  const [show, setShow] = useState(null);
  const [filter, setFilter] = useState();
  const [errorOccured, setErrorOccured] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(null);
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

      <TestEventModal
        show={show}
        onHide={handleClose}
        testTemplate={testTemplate}
        handleInput={handleInput}
        handleComment={handleComment}
        handleBoolInput={handleBoolInput}
        handleSubmit={handleSubmit}
      />

      <TaskTable
        keyField="id"
        data={tasklist}
        setShow={setShow}
        filter={filter}
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
