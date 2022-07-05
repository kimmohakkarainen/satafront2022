import React, { useReducer } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import PasswordForm, { reducer, initialState } from "./passwordform";

const PasswordModal = ({ person, onSubmit, onClose, modal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function createMessage(person, state) {
    return {
      personId: person.personId,
      version: person.version,
      password1: state.newPassword
    };
  }

  return (
    <Modal show={person != null} onHide={() => { }}>
      <Modal.Header>
        <Modal.Title>
          Aseta uusi salasana
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PasswordForm person={person} state={state} dispatch={dispatch} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Peruuta
        </Button>
        <Button
          onClick={() => onSubmit(createMessage(person, state))}
          variant="primary"
          disabled={
            !state.newPasswordValid ||
            !state.newPassword2Valid ||
            state.currentPasswordInvalid
          }
        >
          Tallenna
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PasswordModal;