import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormLabel,
  InputGroup,
  Modal,
  Row
} from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-widgets/DatePicker";
import { Multiselect } from "react-widgets";
import "react-widgets/styles.css";
import MeasureNew from "./measureNew";
import { postTest } from "../actions";

const TestNew = ({ postTest, activeDevice, tags }) => {
  const [createTestActive, setCreateTestActive] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tempMeasures, setTempMeasures] = useState([]);
  const [selectedTags, setSelectedTags] = useState([])
  const [reqUnit, setReqUnit] = useState("DAYS")
  const [setUnit, setSetUnit] = useState("DAYS")
  const [validated, setValidated] = useState(false)

  const showCreateTest = () => setCreateTestActive(true);
  const hideCreateTest = () => {
    setCreateTestActive(false);
    setTempMeasures([]);
  };

  const addTest = (event) => {
    const form = event.currentTarget
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const newTest = {
        testId: 0,
        deviceId: activeDevice.deviceId,
        description: event.target.description.value,
        reqValue: parseInt(event.target.reqValue.value, 10),
        reqUnit: reqUnit,
        setStart: moment(date).format('YYYY-MM-DD'),
        setValue: parseInt(event.target.setValue.value, 10),
        setUnit: setUnit,
        measurements: tempMeasures,
        tags: selectedTags
      };

      postTest(newTest);

      if (event.target.name.value !== "") {
        setCreateTestActive(false);
      }
      event.target.description.value = "";
      event.target.reqValue.value = "";
      event.target.setValue.value = "";
      setReqUnit("DAYS")
      setSetUnit("DAYS")
      setTempMeasures([]);
      setSelectedTags([])
      setDate(new Date());

      setValidated(false)
      return
    }

    setValidated(true)
  };

  const handleTagCreate = (newTag) => {
    newTag = newTag.replace(/[^a-zA-Z0-9 ]/g, "")
    const newSelected = [...selectedTags, newTag.toUpperCase()]
    setSelectedTags(newSelected)
  }

  return (
    <>
      <Modal show={createTestActive} onHide={hideCreateTest} size="xl" style={{ margin: "auto" }} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Luo uusi testi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 font-weight-bold">
            Pakolliset kentät on merkitty tähdellä (*)
          </div>
          <Form
            id="new-test-form"
            onSubmit={e => addTest(e)}
            noValidate
            validated={validated}
            className="mr-5"
          >
            <Row>
              <Col xs={7}>
                <FormGroup>
                  <FormLabel className="font-weight-bold">
                    *Testin kuvaus
                  </FormLabel>
                  <Form.Control id="new-device-description" name="description" required />
                  <Form.Control.Feedback type="invalid">
                    Anna testille nimi
                  </Form.Control.Feedback>
                </FormGroup>
              </Col>
              <Col xs={5}>
                <FormGroup>
                  <Form.Label className="font-weight-bold">Tägit</Form.Label>
                  <Multiselect
                    data={tags}
                    value={selectedTags}
                    allowCreate={true}
                    onCreate={(newTag) => handleTagCreate(newTag)}
                    onChange={(setTags) => setSelectedTags(setTags)}
                  />
                  <Form.Text>
                    Käytä nimetessä vain aakkosia ja/tai numeroita.
                  </Form.Text>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <FormGroup>
                  <FormLabel className="font-weight-bold">
                    *Suoritustiheysvaatimus
                  </FormLabel>
                  <InputGroup>
                    <Form.Control type="number" id="input-reqvalue" name="reqValue" required />
                    <Button
                      value="DAYS"
                      onClick={e => setReqUnit(e.target.value)}
                      checked={reqUnit === "DAYS"}
                      variant={reqUnit === "DAYS" ? "primary" : "outline-secondary"}
                    >
                      päivä
                    </Button>
                    <Button
                      value="WEEKS"
                      onClick={e => setReqUnit(e.target.value)}
                      checked={reqUnit === "WEEKS"}
                      variant={reqUnit === "WEEKS" ? "primary" : "outline-secondary"}
                    >
                      viikko
                    </Button>
                    <Button
                      value="MONTHS"
                      onClick={e => setReqUnit(e.target.value)}
                      check={reqUnit === "MONTHS"}
                      variant={reqUnit === "MONTHS" ? "primary" : "outline-secondary"}
                    >
                      kuukausi
                    </Button>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup>
                  <FormLabel className="font-weight-bold">
                    *Suoritusväli
                  </FormLabel>
                  <InputGroup>
                    <Form.Control type="number" id="input-setvalue" name="setValue" required />
                    <Button
                      value="DAYS"
                      onClick={e => setSetUnit(e.target.value)}
                      checked={setUnit === "DAYS"}
                      variant={setUnit === "DAYS" ? "primary" : "outline-secondary"}
                    >
                      päivä
                    </Button>
                    <Button
                      value="WEEKS"
                      onClick={e => setSetUnit(e.target.value)}
                      checked={setUnit === "WEEKS"}
                      variant={setUnit === "WEEKS" ? "primary" : "outline-secondary"}
                    >
                      viikko
                    </Button>
                    <Button
                      value="MONTHS"
                      onClick={e => setSetUnit(e.target.value)}
                      check={setUnit === "MONTHS"}
                      variant={setUnit === "MONTHS" ? "primary" : "outline-secondary"}
                    >
                      kuukausi
                    </Button>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs={4}>
                <Form.Group>
                  <Form.Label className="font-weight-bold">
                    Aloituspäivämäärä
                  </Form.Label>
                  <DatePicker value={date} onChange={d => setDate(d)} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row className="mt-3">
            <Col>
              <MeasureNew setTempMeasures={setTempMeasures} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button id="btn-save-test" form="new-test-form" type="submit" className="mt-4">
                Lisää
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Button id="btn-add-test" onClick={showCreateTest} className="mb-2 mr-2">
        Lisää testi
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  if (state == null || state.devices == null || state.activeDevice == null) {
    return { devices: [], activeDevice: null, tests: [], tags: [] };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTest: (test) => dispatch(postTest(test))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestNew);
