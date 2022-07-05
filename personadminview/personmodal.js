import React, { useReducer } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import PersonForm, { initialState, reducer } from "./personform";

function createMessage(person, state) {
  return {
    personId: person.personId,
    version: person.version,
    fullname: state.fullname,
    email: state.email,
    username: state.username,
    tags: state.tags
  };
}

export default function PersonModal({ person, tags, onSubmit, onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState(person, tags));

  const title =
    person.personId == null ? "Lisää käyttäjä" : "Muokkaa käyttäjän tietoja";

  return (
    <Modal show={person != null} onHide={() => { }}>
      <Modal.Header>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PersonForm state={state} dispatch={dispatch} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Peruuta
        </Button>
        <Button
          onClick={() => onSubmit(createMessage(person, state))}
          variant="primary"
        >
          Tallenna
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
