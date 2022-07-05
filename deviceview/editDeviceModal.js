import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
} from "react-bootstrap";

import { Multiselect } from "react-widgets";
import "react-widgets/styles.css";

export default function EditDeviceModal({ activeDevice, tags, updateDevice }) {
	
  const [name, setName] = useState(activeDevice.name)
  const [serialNumber, setSerialNumber] = useState(activeDevice.serialNumber)
  const [yearOfCommission, setYearOfCommission] = useState(activeDevice.yearOfCommission)
  const [info, setInfo] = useState(activeDevice.info)
  const [selectedTags, setSelectedTags] = useState(activeDevice.tags)
  const [validated, setValidated] = useState(false)

  const handleTagCreate = (newTag) => {
    const newSelected = [...selectedTags, newTag.toUpperCase()]
    setSelectedTags(newSelected)
  }


  const handleUpdate = (event) => {
    const form = event.currentTarget
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      updateDevice({
        name: name,
        serialNumber: serialNumber,
        yearOfCommission: yearOfCommission,
        info: info,
        tags: selectedTags,
        deviceId: activeDevice.deviceId
      });
      setValidated(false)
      return
    }

    setValidated(true)
  }

	
	return (
	<div>
		<Modal.Header closeButton>
          <Modal.Title>Muokkaa laitetta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleUpdate(e)} noValidate validated={validated}>
            <Form.Group>
              <Form.Label className="font-weight-bold">Laitteen nimi</Form.Label>
              <Form.Control
                id="edit-device-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Laitteen nimi ei voi olla tyhjä
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Laitteen sarjanumero</Form.Label>
              <Form.Control
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Laitteen sarjanumero ei voi olla tyhjä
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Käyttöönottovuosi</Form.Label>
              <Form.Control
                type="number"
                value={yearOfCommission}
                onChange={(e) => setYearOfCommission(e.target.value)}
                required
                min={1900}
                max={3000}
              />
              <Form.Control.Feedback type="invalid">
                Laitteen käyttöönottovuosi ei täytä vaatimuksia
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Tägit</Form.Label>
              <Multiselect
                data={tags}
                value={selectedTags}
                allowCreate={true}
                onCreate={(newTag) => handleTagCreate(newTag)}
                onChange={(setTags) => setSelectedTags(setTags)}
              />
            </Form.Group>

            <Form.Group>
	          <Form.Label className="font-weight-bold">Lisätiedot</Form.Label>
              <Form.Control as="textarea" rows={3} id="input-device-info" 
              	value={info}
              	onChange={(e) => setInfo(e.target.value)}
 
              />
            </Form.Group>

            <Button id="edit-device-save-btn" type="submit">
              Tallenna
            </Button>
          </Form>
        </Modal.Body>

		</div>
	);
}