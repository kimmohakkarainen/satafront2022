import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormControl
} from "react-bootstrap";

export default function DeleteTaskModal({ task, dispatch }) {
  const hetu = task == null ? "" : task.hetu;
  const tutkimusPaiva = task == null ? "" : task.tutkimusPaiva;
  const sukunimi = task == null ? "" : task.sukunimi;
  const tutkimus = task == null ? "" : task.tutkimus.label;
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Poista lausuttava</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <FormLabel>Tutkimuspäivä</FormLabel>
          <FormControl readOnly defaultValue={tutkimusPaiva} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Henkilötunnus</FormLabel>
          <FormControl readOnly defaultValue={hetu} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Sukunimi</FormLabel>
          <FormControl readOnly defaultValue={sukunimi} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Tutkimus</FormLabel>
          <FormControl readOnly defaultValue={tutkimus} />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-delete-task" variant="danger" onClick={() => dispatch(task)}>
          OK
        </Button>
      </Modal.Footer>
    </div>
  );
}
