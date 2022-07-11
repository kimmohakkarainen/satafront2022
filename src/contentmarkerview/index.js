import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import {
  fetchContentmarkableTasks,
  fetchAllContentmarkableTasks,
  addContentmarker
} from "../actions";

const ContentmarkerView = ({
  addContentmarker,
  fetchContentmarkableTasks,
  fetchAllContentmarkableTasks,
  markableTasks,
  markableTasksAll,
  person
}) => {
  const [showAll, setShowAll] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchContentmarkableTasks();
  }, [fetchContentmarkableTasks]);

  useEffect(() => {
    if (showAll) {
      setTableData(markableTasksAll);
    } else {
      setTableData(markableTasks);
    }
  }, [markableTasksAll, markableTasks, showAll]);

  const handleChange = () => {
    if (showAll) {
      fetchContentmarkableTasks();
      setTableData([]);
      setShowAll(false);
    } else {
      fetchAllContentmarkableTasks();
      setTableData([]);
      setShowAll(true);
    }
  };

  const buttonFormatter = (cell, row, rowIndex, formatExtradata) => {
    return (
      <>
        {console.log(row)}
        {showAll === false && (
          <Button
            id={`taskid-${row.taskId}`}
            onClick={() => addContentmarker(person, row)}
          >
            Kuittaa
          </Button>
        )}
        {showAll === true && (
          <>
            {row.contentMarker && (
              <Button variant="success" active>
                OK
              </Button>
            )}
          </>
        )}
      </>
    );
  };

  const columns = [
    {
      dataField: "name",
      text: "Sisältömerkintä",
      formatter: buttonFormatter
    },
    {
      dataField: "tutkimusPaiva",
      text: "Tutkimuspäivä"
    },
    {
      dataField: "tutkimus.label",
      text: "Tutkimus"
    },
    {
      dataField: "hetu",
      text: "Potilaan henkilötunnus"
    },
    {
      dataField: "sukunimi",
      text: "Potilaan sukunimi"
    },
    {
      dataField: "vastaanottoPaiva",
      text: "Potilaan vastaanotto"
    }
  ];

  return (
    <>
      <Card>
        <Card.Header>
          <Row>
            <Col xs={4}>
              <Card.Title className="font-weight-bold">
                Sisältömerkittävät
              </Card.Title>
            </Col>
            <Col xs={6} />
            <Col xs={2}>
              <Form>
                <Form.Group>
                  <Form.Check
                    id="checkbox-show-all"
                    inline
                    label="Näytä kaikki"
                    type="checkbox"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <BootstrapTable keyField="id" columns={columns} data={tableData} />
        </Card.Body>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    markableTasks: state.markableTasks,
    markableTasksAll: state.markableTasksAll,
    person: state.person
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContentmarkableTasks: () => dispatch(fetchContentmarkableTasks()),
    fetchAllContentmarkableTasks: () =>
      dispatch(fetchAllContentmarkableTasks()),
    addContentmarker: (Person, Task) => dispatch(addContentmarker(Person, Task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentmarkerView);
