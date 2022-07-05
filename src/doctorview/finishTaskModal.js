import React from "react";

import {
  Modal,
  Button,
  Form
} from "react-bootstrap";

const FinishTaskModal = ({ handleFinishTask, info }) => {
  return (
    <>
      {info !== undefined && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Merkitse lausuttava valmiiksi</Modal.Title>
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
            <Button id="btn-finish-task" variant="primary" onClick={() => handleFinishTask()}>Valmis</Button>
          </Modal.Footer>
        </>
      )}
    </>
  );
}

export default FinishTaskModal;