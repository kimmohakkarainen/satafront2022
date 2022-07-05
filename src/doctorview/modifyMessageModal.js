import React, { useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";

const ModifyMessageModal = ({handleCreateTask, info}) => {
  const [text, setText] = useState(() => {
    if (info.viesti !== null) {
      return info.viesti
    } else {
      return null
    }
  })

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      <Modal.Header>
        <Modal.Title>Lisätiedot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Henkilötunnus</Form.Label>
            <Form.Control id="input-henkilotunnus" readOnly
              type="text"
              value={info.hetu}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Sukunimi</Form.Label>
            <Form.Control id="input-sukunimi" readOnly
              type="text"
              value={info.sukunimi}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Tutkimus</Form.Label>
            <Form.Control id="input-tutkimus" type="text" readOnly value={info.tutkimus.label} />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Lisätiedot</Form.Label>
            <Form.Control id="input-lisatiedot" componentClass="textarea" readOnly
              value={info.lisatiedot}
            />
          </Form.Group>
        </Form>
        <Form>
          <Form.Group>
            <Form.Label>Viesti</Form.Label>
            <Form.Control id="input-viesti" componentClass="textarea"
              placeholder="Tähän mahdollinen viesti"
              value={text}
              onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button id="btn-save-task" variant="primary" onClick={() => handleCreateTask(text)}>Talleta</Button>
        </Modal.Footer>
    </>
  );
}

export default ModifyMessageModal;