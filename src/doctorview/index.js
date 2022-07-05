import React from "react";
import { connect } from "react-redux"
import { Card } from "react-bootstrap";

import InProgressEntries from "./inProgressEntries.js";
import ErrorView from "../enterview/errorview";

const DoctorView = ({ errorModal }) => {
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title className="font-weight-bold">
            Omat keskeneräiset lausuttavat
          </Card.Title>
          <Card.Body>
            <InProgressEntries />
          </Card.Body>
        </Card.Header>
      </Card>
      <ErrorView />
    </>
  );
}

function mapStateToProps(state) {
  return {
    errorModal: state.errorModal,
  };
}

export default connect(mapStateToProps)(DoctorView);