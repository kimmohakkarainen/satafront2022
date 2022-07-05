import React, { useState } from "react"
import { connect } from "react-redux"

import { Button, Col, Modal, Row, Table } from "react-bootstrap"

const DeviceIncidents = ({ incidents, getAttachmentsByIncidentId, attachments, downloadAttachment }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    getAttachmentsByIncidentId(id)
  }

  const handleDownload = (id, filename) => {
    downloadAttachment(id, filename)
  }

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Vikamerkinnän otsikko</th>
            <th>Päiväys</th>
            <th>Kuvaus</th>
            <th>Liitteet</th>
          </tr>
        </thead>
        <tbody>
          {incidents.length > 0 ?
            incidents.map(incident => {
              return (
                <tr>
                  <td>{incident.title}</td>
                  <td>{incident.date}</td>
                  <td>{incident.description}</td>
                  <td><Button onClick={() => handleShow(incident.eventId)}>Liitteet</Button></td>
                </tr>
              )
            })
            : <tr><td colSpan="3">Ei vikamerkintöjä</td></tr>
          }
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Lataa liitteitä</Modal.Title>
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
                    >
                      Lataa
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

export default connect(null)(DeviceIncidents)