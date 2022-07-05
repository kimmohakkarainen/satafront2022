import React, { useState } from "react"
import { connect } from "react-redux"
import {
  getAttachmentsByIncidentId,
  downloadAttachment,
  fetchEventItemsByEventId,
  postIncidentFromModal,
  postServiceEventFromModal,
} from "../actions";
import TestEventItemModal from "./testEventItemModal";
import moment from "moment";

import { Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap"

const DeviceEvents = ({
  activeDevice,
  incidents,
  events,
  attachments,
  eventItem,
  getAttachmentsByIncidentId,
  downloadAttachment,
  fetchEventItemsByEventId,
  postIncidentFromModal,
  postServiceEventFromModal,
  attachmentDownloading
}) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [eventId, setEventId] = useState(null)
  const [date, setDate] = useState(new Date());
  const [validated, setValidated] = useState(false);
  const [isIncident, setIsIncident] = useState(true);
  const [eventStatus, setEventStatus] = useState("Matala");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    getAttachmentsByIncidentId(id)
  }

  const handleDownload = (id, filename) => {
    downloadAttachment(id, filename)
  }

  const handleModalOpen = (e, id) => {
    e.stopPropagation()
    fetchEventItemsByEventId(id)
    setEventId(id)
    setShowModal(true)
  }

  const addIncident = (event) => {
    const form = event.currentTarget
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      let eventStat;
      if (eventStatus === "Suljettu") {
        eventStat = "CLOSED"
      } else if (eventStatus === "Matala") {
        eventStat = "LOW"
      } else if (eventStatus === "Keskisuuri") {
        eventStat = "MEDIUM"
      } else if (eventStatus === "Kriittinen") {
        eventStat = "CRITICAL"
      }

      if (isIncident) {
        postIncidentFromModal(
          {
            eventId: eventId,
            deviceId: activeDevice.deviceId,
            date: moment(date).format('YYYY-MM-DD'),
            title: event.target.title.value,
            description: event.target.description.value,
            eventStatus: eventStat
          },
          incidents
        );
      } else {
        postServiceEventFromModal(
          {
            eventId: eventId,
            deviceId: activeDevice.deviceId,
            date: moment(date).format('YYYY-MM-DD'),
            title: event.target.title.value,
            description: event.target.description.value,
            eventStatus: eventStat
          }
        )
      }

      setDate(new Date());
      event.target.title.value = "";
      event.target.description.value = "";
      setEventStatus("Matala")
      setValidated(false)
    }
  }

  return (
    <>
      <Table striped bordered hovered>
        <thead>
          <tr>
            <th>Otsikko</th>
            <th>Tyyppi</th>
            <th>Luokitus</th>
            <th>Päiväys</th>
            <th>Kuvaus</th>
            <th>Liitteet</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ?
            events.map(event => {
              return (
                <>
                  <tr onClick={(e) => handleModalOpen(e, event.eventId)}>
                    <td>{event.title}</td>
                    <td>
                      {event.eventType === "SERVICE_EVENT"
                        ? "Huoltomerkintä"
                        : "Vikamerkintä"}
                    </td>
                    <td>
                      <Button
                        disabled
                        variant={getButtonStyle(event.eventStatus)}
                        className="font-weight-bold"
                      >
                        {getEventTranslated(event.eventStatus)}
                      </Button>
                    </td>
                    <td>{moment(event.date).format("DD.MM.YYYY")}</td>
                    <td>{event.description}</td>
                    <td onClick={e => e.stopPropagation()}>
                      {event.hasAttachments &&
                        <Button onClick={() => handleShow(event.eventId)}>
                          Liitteet
                        </Button>}
                    </td>
                  </tr>
                </>
              )
            })
            : <tr><td colSpan="3">Ei merkintöjä</td></tr>
          }
        </tbody>
      </Table>

      <TestEventItemModal
        showModal={showModal}
        setShowModal={setShowModal}
        eventItem={eventItem}
        addIncident={addIncident}
        validated={validated}
        date={date}
        setDate={setDate}
        isIncident={isIncident}
        setIsIncident={setIsIncident}
        eventStatus={eventStatus}
        setEventStatus={setEventStatus}
      />

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Avaa liitteet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attachments !== undefined && attachments.length > 0
            ? attachments.map(attachment => {
              return (
                <Row className="mb-1">
                  <Col>{attachment.name}</Col>
                  <Col>
                    <Button
                      className="float-right"
                      onClick={() => handleDownload(attachment.attachmentId, attachment.name)}
                      disabled={attachmentDownloading}
                    >
                      {attachmentDownloading ? <Spinner animation="border" /> : "Lataa"}
                    </Button>
                  </Col>
                </Row>
              )
            })
            :
            <div>Ei liitteitä</div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sulje
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const getEventTranslated = (eventStatus) => {
  switch (eventStatus) {
    case "CRITICAL":
      return "KRIITTINEN"
    case "MEDIUM":
      return "KESKISUURI"
    case "LOW":
      return "MATALA"
    case "CLOSED":
      return "SULJETTU"
    default:
      return ""
  }
}

const getButtonStyle = (eventStatus) => {
  switch (eventStatus) {
    case "CRITICAL":
      return "danger"
    case "MEDIUM":
      return "warning"
    case "LOW":
      return "info"
    case "CLOSED":
      return "secondary"
    default:
      return "warning"
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttachmentsByIncidentId: (id) => dispatch(getAttachmentsByIncidentId(id)),
    downloadAttachment: (id, extension) => dispatch(downloadAttachment(id, extension)),
    fetchEventItemsByEventId: (id) => dispatch(fetchEventItemsByEventId(id)),
    postIncidentFromModal: (Incident, incidents) => dispatch(postIncidentFromModal(Incident, incidents)),
    postServiceEventFromModal: (serviceEvent) => dispatch(postServiceEventFromModal(serviceEvent))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceEvents)