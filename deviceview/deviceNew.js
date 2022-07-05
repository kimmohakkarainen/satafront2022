import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormLabel,
  Modal
} from "react-bootstrap";
import { postDevice } from "../actions";
import { Multiselect } from "react-widgets";
import "react-widgets/styles.css";

const DeviceNew = ({ postDevice, tags, person }) => {
  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState([])
  const [validated, setValidated] = useState(false)

  const showCreateDevice = () => setCreateDeviceActive(true);
  const hideCreateDevice = () => setCreateDeviceActive(false);

  const addDevice = (event) => {
    const form = event.currentTarget
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (event.target.name.value !== "") {
        postDevice({
          name: event.target.name.value,
          serialNumber: event.target.serialNumber.value,
          yearOfCommission: event.target.yearOfCommission.value,
          info: event.target.info.value,
          tags: selectedTags
        });
        setCreateDeviceActive(false);
        setSelectedTags([])
      }
      event.target.name.value = "";
      event.target.serialNumber.value = "";
      event.target.yearOfCommission.value = "";
      setValidated(false)
      return
    }

    setValidated(true)
  };

  const handleTagCreate = (newTag) => {
    const newSelected = [...selectedTags, newTag.toUpperCase()]
    setSelectedTags(newSelected)
  }

  return (
    <>
      {person && person.tags.some(role => (role === "ROLE_ADMIN")) &&
        <>
          <Modal show={createDeviceActive} onHide={hideCreateDevice} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Lisää laite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3 font-weight-bold">
                Pakolliset kentät on merkitty tähdellä (*)
              </div>
              <Form onSubmit={addDevice} noValidate validated={validated}>
                <Form.Row className="align-items-center">
                  <Col>
                    <FormGroup>
                      <FormLabel className="font-weight-bold">
                        *Laitteen nimi
                      </FormLabel>
                      <Form.Control id="input-device-name" name="name" required />
                      <Form.Control.Feedback type="invalid">
                        Anna laitteen nimi
                      </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel className="font-weight-bold">
                        *Laitteen sarjanumero
                      </FormLabel>
                      <Form.Control id="input-device-serialnr" name="serialNumber" required />
                      <Form.Control.Feedback type="invalid">
                        Anna laitteen sarjanumero
                      </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel className="font-weight-bold">
                        *Käyttöönottovuosi
                      </FormLabel>
                      <Form.Control type="number" min={1900} max={3000} id="btn-save-device" id="input-device-commission" name="yearOfCommission" required />
                      <Form.Control.Feedback type="invalid">
                        Anna laitteen käyttöönottovuosi
                      </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup>
                      <Form.Label className="font-weight-bold">Tägit</Form.Label>
                      <Multiselect
                        data={tags}
                        value={selectedTags}
                        allowCreate={true}
                        onCreate={(newTag) => handleTagCreate(newTag)}
                        onChange={(setTags) => setSelectedTags(setTags)}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <FormLabel className="font-weight-bold">
                        Lisätiedot
                      </FormLabel>
                      <Form.Control as="textarea" rows={3} id="input-device-info" name="info" />
                    </FormGroup>

                    <Button id="add-new-device-button" className="mt-3" type="submit">
                      Lisää
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </Modal.Body>
          </Modal>
          <Button id="btn-add-device" onClick={showCreateDevice} className="mb-2">
            Lisää laite
          </Button>
        </>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  if (state == null) {
    return { tags: [] };
  } else {
    return state;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    postDevice: (device) => dispatch(postDevice(device))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceNew);
