import React from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Container, Table } from "react-bootstrap";
import { fetchTests } from "../actions";

const TestView = ({ tests, fetchTests }) => {
  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return (
    <Container className="mt-3 mb-3">
      <Card>
        <Table hover>
          <tbody>
            <tr key={0}>
              <th>Laitteen ID</th>
              <th>Testin ID</th>
              <th>Testin selite</th>
              <th>Mittausväli</th>
              <th>Testin arvoväli</th>
            </tr>
            {tests.map((test) => {
              return (
                <tr key={test.testId}>
                  <td>{test.deviceId}</td>
                  <td>{test.testId}</td>
                  <td>{test.description}</td>
                  <td>{test.setExecutionFrequency}</td>
                  <td>
                    {test.setLimitLow}-{test.setLimitHigh} {test.unit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  if (state == null || state.tests == null) {
    return { tests: [] };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTests: () => dispatch(fetchTests())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestView);
