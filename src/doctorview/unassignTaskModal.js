import React from "react";

import {
  Modal,
  Button,
  Form
} from "react-bootstrap";

const UnassignTaskModal = ({ handleUnassignTask, info }) => {

  return (
    <>
      {info !== undefined && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Vapauta lausuttava</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Henkilötunnus</Form.Label>
                <Form.Control readOnly
                  type="text"
                  value={info.hetu}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group>
                <Form.Label>Sukunimi</Form.Label>
                <Form.Control readOnly
                  type="text"
                  value={info.sukunimi}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Group>
                <Form.Label>Tutkimus</Form.Label>
                <Form.Control type="text" readOnly value={info.tutkimus.label} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button id="btn-release-task" variant="primary" onClick={() => handleUnassignTask()}>Vapauta</Button>
          </Modal.Footer>
        </>
      )}
    </>
  )

}

export default UnassignTaskModal;