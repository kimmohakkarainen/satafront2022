import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { getExaminations, modifyExamination } from "../actions";
import ExaminationTable from "./examinationTable";
import ErrorModal from "./errorModal";

const ExaminationAdminView = ({ getExaminations, modifyExamination, examinations, error }) => {

  useEffect(() => {
    getExaminations()
  }, [getExaminations])

  const handleTallenna = (e) => {
    const examination = {
        examinationId: e.examinationId,
        version: e.version,
        name: e.name,
        doctorPrice: e.doctorPrice,
        invoicePrice: e.invoicePrice,
        marker: e.marker
    };
    modifyExamination(examination);
  }

  const onCloseModal = () => {
    getExaminations()
  }

  return (
    <div>
      <ErrorModal error={error} onClose={onCloseModal} />

      <Card>
        <Card.Header>
          <Card.Title className="font-weight-bold">
            Tutkimukset
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <ExaminationTable
            examinations={examinations}
            onTallenna={handleTallenna}
          />
        </Card.Body>
      </Card>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    examinations: state.examinations,
    error: state.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExaminations: () => dispatch(getExaminations()),
    modifyExamination: (data) => dispatch(modifyExamination(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExaminationAdminView);