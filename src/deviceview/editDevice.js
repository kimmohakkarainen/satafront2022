import React, { useEffect, useState } from "react"
import { connect } from "react-redux";

import { updateDevice, deleteDevice } from "../actions";

import { Button, Form, Modal } from "react-bootstrap"
import DeleteDeviceModal from "./deleteDeviceModal.js";
import EditDeviceModal from "./editDeviceModal.js";

const EditDevice = ({ activeDevice, tags, updateDevice, deleteDevice }) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Button id="edit-device-btn" onClick={() => setShow(true)}>
        Muokkaa
      </Button>
      { activeDevice.deleteable && <Button variant="danger" id="del-device-btn" onClick={() => setShowDelete(true)}>Poista</Button> } 

      <Modal show={showDelete} onHide={() => setShowDelete(false)} backdrop="static">
      	<DeleteDeviceModal device={activeDevice} dispatch={() => deleteDevice(activeDevice)} />
      </Modal>
		

      <Modal show={show} onHide={() => setShow(false)} backdrop="static">
      	<EditDeviceModal activeDevice={activeDevice} tags={tags} updateDevice={
			(e) => {
				updateDevice(e);
				setShow(false);
			}} />	
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDevice: (Device) => dispatch(updateDevice(Device)),
    deleteDevice: (Device) => dispatch(deleteDevice(Device))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDevice)