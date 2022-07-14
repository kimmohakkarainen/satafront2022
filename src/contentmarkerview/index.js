import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Card, Col, Form, Row } from "react-bootstrap";
import ContentMarkerTable from "./contentmarkertable";

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
          <ContentMarkerTable
            person={person}
            addContentmarker={addContentmarker}
            showAll={showAll}
            keyField="id"
            data={tableData}
          />
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
