import React from "react";
import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { setValueToString, reqValueToString } from "./deviceUtil";

export default function DeleteTestModal({ test, dispatch }) {
  const testVar = test == null ? {} : test;
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Poista testi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Testin kuvaus</Form.Label>
          <Form.Control readOnly defaultValue={testVar.description} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Suoritustiheysvaatimus</Form.Label>
          <Form.Control readOnly defaultValue={reqValueToString(testVar)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Suoritusväli</Form.Label>
          <Form.Control readOnly defaultValue={setValueToString(testVar)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-delete-device" variant="danger" onClick={() => dispatch(test)}>
          OK
        </Button>
      </Modal.Footer>
    </div>
  );
}
