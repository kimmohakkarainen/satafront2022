import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row
} from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-widgets/DatePicker";

import { postIncident, postServiceEvent } from "../actions";
import AttachmentTable from "./attachmenttable";

const IncidentModal = ({
  activeDevice,
  incidents,
  postIncident,
  postServiceEvent
}) => {
  const [date, setDate] = useState(new Date());
  const [isIncident, setIsIncident] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [eventStatus, setEventStatus] = useState("Matala")

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const addIncident = (event) => {
    const form = event.currentTarget
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (isIncident) {
        let eventStat;
        if (eventStatus === "Matala") {
          eventStat = "LOW"
        } else if (eventStatus === "Keskisuuri") {
          eventStat = "MEDIUM"
        } else {
          eventStat = "CRITICAL"
        }

        postIncident(
          {
            deviceId: activeDevice.deviceId,
            date: moment(date).format('YYYY-MM-DD'),
            title: event.target.title.value,
            description: event.target.description.value,
            eventStatus: eventStat
          },
          incidents
        );
      } else {
        postServiceEvent(
          {
            deviceId: activeDevice.deviceId,
            date: moment(date).format('YYYY-MM-DD'),
            title: event.target.title.value,
            description: event.target.description.value
          }
        )
      }

      setDate(new Date());
      event.target.title.value = "";
      event.target.description.value = "";
      handleCloseModal();
      setEventStatus("Matala")
      setValidated(false)
      return
    }

    setValidated(true)
  };

  return (
    <>
      <Button id="new-event-item-btn" variant="primary" onClick={handleShowModal} className="mb-2">
        Lisää vika- ja huoltomerkintä
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Lisää vika- ja huoltomerkintä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 font-weight-bold">
            Pakolliset kentät on merkitty tähdellä (*)
          </div>
          <Row>
            <Col>
              <Form onSubmit={addIncident} noValidate validated={validated}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label className="font-weight-bold">Valitse merkinnän tyyppi</Form.Label>
                    </Col>
                    <Col>
                      <Form.Label className="font-weight-bold">Valitse luokitus</Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <DropdownButton
                        id="type-dropdown"
                        title={isIncident ? "Vikamerkintä" : "Huoltomerkintä"}
                        variant={isIncident ? "danger" : "primary"}
                      >
                        <Dropdown.Item id="incident-item" onClick={() => setIsIncident(true)}>Vikamerkintä</Dropdown.Item>
                        <Dropdown.Item id="service-event-item"onClick={() => setIsIncident(false)}>Huoltomerkintä</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                    <Col>
                      <DropdownButton
                        id="event-status"
                        title={eventStatus}
                        variant={isIncident ? "danger" : "primary"}
                      >
                        <Dropdown.Item onClick={() => setEventStatus("Kriittinen")}>Kriittinen</Dropdown.Item>
                        <Dropdown.Item onClick={() => setEventStatus("Keskisuuri")}>Keskisuuri</Dropdown.Item>
                        <Dropdown.Item onClick={() => setEventStatus("Matala")}>Matala</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>
                    <strong>{isIncident ? "Vian löytymisen" : "Huollon"} päivämäärä</strong>
                  </Form.Label>
                  <DatePicker value={date} onChange={d => setDate(d)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <strong>*{isIncident ? "Vian" : "Huollon"} lyhyt kuvaus</strong>
                  </Form.Label>
                  <Form.Control id="incident-title" name="title" type="text" required />
                  <Form.Control.Feedback type="invalid">
                    Merkinnällä tulee olla lyhyt kuvaus.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <strong>Kuvaus</strong>
                  </Form.Label>
                  <Form.Control
                    id="incident-description"
                    name="description"
                    type="text"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <strong>Liitetiedostot</strong>
                  </Form.Label>
                  <AttachmentTable />
                </Form.Group>

                <Button id="incident-submit-btn" type="submit" variant={isIncident ? "danger" : "primary"}>
                  Lisää {isIncident ? "vika" : "huolto"}merkintä
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  if (state == null || state.devices == null) {
    return { devices: [] };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchDevice: (deviceId, searchParams) => dispatch(searchDevice(deviceId, searchParams)),
    postIncident: (Incident, incidents) => dispatch(postIncident(Incident, incidents)),
    postServiceEvent: (serviceEvent) => dispatch(postServiceEvent(serviceEvent))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentModal);
