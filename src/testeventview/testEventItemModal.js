import React, { useState } from "react"
import { connect } from "react-redux"
import DatePicker from "react-widgets/DatePicker";
import AttachmentTable from "../incidentview/attachmenttable";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Table
} from "react-bootstrap"
import moment from "moment";

const TestEventItemModal = ({
  showModal,
  setShowModal,
  eventItem,
  addIncident,
  validated,
  date,
  setDate,
  isIncident,
  setIsIncident,
  eventStatus,
  setEventStatus
}) => {
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Merkinnän lisätiedot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 font-weight-bold">
            Pakolliset kentät on merkitty tähdellä (*)
          </div>
          <Row>
            <Col>
              <Form id="new-incident-modal" onSubmit={addIncident} noValidate validated={validated}>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label className="font-weight-bold">Valitse merkinnän tyyppi</Form.Label>
                    </Col>
                    <Col>
                      <Form.Label className="font-weight-bold">Valitse luokitus</Form.Label>
                    </Col>
                    <Col>
                      <Form.Label>
                        <strong>{isIncident ? "Vian löytymisen" : "Huollon"} päivämäärä</strong>
                      </Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <DropdownButton
                        id="type-dropdown"
                        title={isIncident ? "Vikamerkintä" : "Huoltomerkintä"}
                        variant={isIncident ? "danger" : "primary"}
                      >
                        <Dropdown.Item onClick={() => setIsIncident(true)}>Vikamerkintä</Dropdown.Item>
                        <Dropdown.Item onClick={() => setIsIncident(false)}>Huoltomerkintä</Dropdown.Item>
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
                        <Dropdown.Item onClick={() => setEventStatus("Suljettu")}>Suljettu</Dropdown.Item>
                      </DropdownButton>
                    </Col>
                    <Col>
                      <DatePicker value={date} onChange={d => setDate(d)} />
                    </Col>
                  </Row>
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
          <Row>
            <Col>
              <h3 className="font-weight-bold mt-2">Historia</h3>
              <Table bordered striped className="mt-3">
                <thead>
                  <tr>
                    <th>Otsikko</th>
                    <th>Luokitus</th>
                    <th>Päiväys</th>
                    <th>Kuvaus</th>
                  </tr>
                </thead>
                <tbody>
                  {(eventItem !== null && eventItem.eventItems !== undefined && eventItem.eventItems.length > 0) &&
                    <>
                      {
                        eventItem.eventItems.map(eventItem => {
                          return (
                            <tr>
                              <td>{eventItem.title}</td>
                              <td>
                                <Button
                                  disabled
                                  variant={getButtonStyle(eventItem.eventStatus)}
                                  className="font-weight-bold"
                                >
                                  {getEventTranslated(eventItem.eventStatus)}
                                </Button>
                              </td>
                              <td>{moment(eventItem.date).format("DD.MM.YYYY")}</td>
                              <td>{eventItem.description}</td>
                            </tr>
                          )
                        })
                      }
                    </>
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
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

export default connect(null)(TestEventItemModal)