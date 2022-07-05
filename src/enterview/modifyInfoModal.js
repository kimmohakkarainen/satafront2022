import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  Modal,
  Button,
  ToggleButton,
  ButtonToolbar,
  ToggleButtonGroup,
  FormGroup,
  FormLabel,
  FormControl,
  FormText
} from "react-bootstrap";
import moment from "moment";
import DatePicker from "react-widgets/DatePicker";

import { initialState } from "./taskReducer";

export default function ModifyInfoModal({
  dispatch,
  task
}) {

  const state = initialState(task);

  const [lisatiedot, setLisatiedot] = useState(state.lisatiedot);

  function handleClick() {
    const params = {
      taskId: task.taskId,
      version: task.version,
      hetu: task.hetu,
      sukunimi: task.sukunimi,
      tutkimus: task.tutkimus,
      tutkimusPaiva: task.tutkimusPaiva,
      vastaanottoPaiva: task.vastaanottoPaiva,
      lisatiedot: lisatiedot,
      esitietolomake: task.esitietolomake,
      laakari: task.laakari
    };
    dispatch(params);
  }

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Muokkaa lisätietoja</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <FormLabel>Henkilötunnus</FormLabel>
          <FormControl type="text" readOnly value={state.hetu} />
        </FormGroup>

        <FormGroup>
          <FormLabel>Sukunimi</FormLabel>
          <FormControl type="text" readOnly value={state.sukunimi} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Tutkimus</FormLabel>
          <FormControl type="text" readOnly value={state.tutkimus.label} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Lisätiedot</FormLabel>
          <FormControl
            id="input-lisatiedot"
            as="textarea"
            rows={3}
            placeholder="Tähän mahdolliset lisätiedot"
            value={lisatiedot}
            onChange={e => setLisatiedot(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Viesti lääkäriltä</FormLabel>
          <FormControl as="textarea" rows={3} readOnly value={state.viesti} />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-save-task" variant="primary" onClick={handleClick}>
          Talleta
        </Button>
      </Modal.Footer>
    </div>
  );
}
