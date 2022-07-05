import React from "react";
import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";

export default function DeleteDeviceModal({ device, dispatch }) {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Poista laite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Laitteen nimi</Form.Label>
          <Form.Control readOnly defaultValue={device.name} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Laitteen sarjanumero</Form.Label>
          <Form.Control readOnly defaultValue={device.serialNumber} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Käyttöönottovuosi</Form.Label>
          <Form.Control readOnly defaultValue={device.yearOfCommission} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-delete-device" variant="danger" onClick={() => dispatch(device)}>
          OK
        </Button>
      </Modal.Footer>
    </div>
  );
}
