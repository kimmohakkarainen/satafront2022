import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchExcel, fetchPreview, fetchState } from "../actions";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import InvoiceTable from "./invoicetable";
import { DatePicker, Multiselect } from "react-widgets";
import "react-widgets/styles.css";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

const localizer = new momentLocalizer(moment);

const InvoiceView = ({
  fetchPreview,
  fetchExcel,
  beginDate,
  endDate,
  preview,
  doctorFilter,
  examinationFilter,
  examinationOptions,
  doctorOptions
}) => {
  const [formattedBeginDate, setFormattedBeginDate] = useState("");
  const [apiBeginDate, setApiBeginDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [apiEndDate, setApiEndDate] = useState("");

  useEffect(() => {
    fetchPreview({
      beginDate: null,
      endDate: null,
      doctorFilter: [],
      examinationFilter: []
    });
  }, []);

  if (beginDate && formattedBeginDate === "") {
    const newDate = new Date(beginDate);
    setFormattedBeginDate(newDate);

    const year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = newDate.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }

    setApiBeginDate(`${year}-${month}-${date}`);
  }

  if (endDate && formattedEndDate === "") {
    const newDate = new Date(endDate);
    setFormattedEndDate(newDate);

    const year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = newDate.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }

    setApiEndDate(`${year}-${month}-${date}`);
  }

  const handleExcelClick = () => {
    fetchExcel({
      beginDate: apiBeginDate,
      endDate: apiEndDate,
      doctorFilter: doctorFilter,
      examinationFilter: examinationFilter
    });
  };

  const handleBeginDateChange = (e) => {
    setFormattedBeginDate(e);
    const year = e.getFullYear();
    let month = e.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = e.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }
    setApiBeginDate(`${year}-${month}-${date}`);

    fetchPreview({
      beginDate: `${year}-${month}-${date}`,
      endDate: apiEndDate,
      doctorFilter: doctorFilter,
      examinationFilter: examinationFilter
    });
  };

  const handleEndDateChange = (e) => {
    setFormattedEndDate(e);
    const year = e.getFullYear();
    let month = e.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let date = e.getDate();
    if (date < 10) {
      date = "0" + date.toString();
    }

    setApiEndDate(`${year}-${month}-${date}`);
    fetchPreview({
      beginDate: apiBeginDate,
      endDate: `${year}-${month}-${date}`,
      doctorFilter: doctorFilter,
      examinationFilter: examinationFilter
    });
  };

  const handleDoctorChange = (e) => {
    fetchPreview({
      beginDate: apiBeginDate,
      endDate: apiEndDate,
      doctorFilter: e,
      examinationFilter: examinationFilter
    });
  };

  const handleExaminationChange = (e) => {
    fetchPreview({
      beginDate: apiBeginDate,
      endDate: apiEndDate,
      doctorFilter: doctorFilter,
      examinationFilter: e
    });
  };

  return (
    <div className="billingContainer">
      <Card>
        <Card.Header>
          <Card.Title className="font-weight-bold">Laskutus</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Card className="mb-2">
              <Card.Body>
                <Row>
                  <Col xs={1}>
                    <b>Aloitus</b>
                  </Col>
                  <Col xs={3}>
                    {formattedBeginDate !== "" && (
                      <DatePicker
                        id="begindate-input"
                        value={formattedBeginDate}
                        onChange={(e) => handleBeginDateChange(e)}
                      />
                    )}
                  </Col>
                  <Col xs={1} />
                  <Col xs={1}>
                    <b>Lopetus</b>
                  </Col>
                  <Col xs={3}>
                    {formattedEndDate !== "" && (
                      <DatePicker
                        id="enddate-input"
                        value={formattedEndDate}
                        onChange={(e) => handleEndDateChange(e)}
                      />
                    )}
                  </Col>
                  <Col xs={1} />
                  <Col xs={2}>
                    <Button onClick={() => handleExcelClick()}>
                      Tee lasku
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mb-2">
              <Card.Body>
                <Col>
                  <Row>
                    <Col xs={2}>
                      <b>Lääkäri</b>
                    </Col>
                    <Col xs={10}>
                      <Multiselect
                        dataKey="value"
                        textField="label"
                        data={doctorOptions}
                        value={doctorFilter}
                        onChange={(e) => handleDoctorChange(e)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2}>
                      <b>Tutkimus</b>
                    </Col>
                    <Col xs={10}>
                      <Multiselect
                        dataKey="value"
                        textField="label"
                        data={examinationOptions}
                        value={examinationFilter}
                        onChange={(e) => handleExaminationChange(e)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <InvoiceTable data={preview} />
              </Card.Body>
            </Card>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    person: state.person,
    beginDate: state.beginDate,
    endDate: state.endDate,
    doctorOptions: state.doctorOptions,
    doctorFilter: state.doctorFilter,
    examinationOptions: state.examinationOptions,
    examinationFilter: state.examinationFilter,
    preview: state.preview
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPreview: (beginDate, endDate, doctorFilter, examinationFilter) =>
      dispatch(
        fetchPreview(beginDate, endDate, doctorFilter, examinationFilter)
      ),
    fetchExcel: (beginDate, endDate, doctorFilter, examinationFilter) =>
      dispatch(fetchExcel(beginDate, endDate, doctorFilter, examinationFilter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);
