import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorModal = (props) => {
  return (
    <div>
      {props.error != null &&
        <Modal.Dialog>
          <Modal.Header><Modal.Title>Virhe</Modal.Title></Modal.Header>
          <Modal.Body>{props.error}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={props.onClose}>OK</Button>
          </Modal.Footer>
        </Modal.Dialog>
      }
    </div>
  );
}

export default ErrorModal