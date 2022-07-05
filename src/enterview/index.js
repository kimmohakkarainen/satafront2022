import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, Row, Col, Button, Modal, Tabs, Tab } from "react-bootstrap";

import { fetchState, postCreate, postDelete } from "../actions";

import CreateTaskModal from "./createTaskModal";
import ModifyInfoModal from "./modifyInfoModal";
import DeleteTaskModal from "./deleteTaskModal";

import ErrorView from "./errorview";
import Entries from "./entries";
import IPEntries from "./ipentries";
import NIEntries from "./nientries";

function EnterView({
  person,
  errorModal,
  examinationOptions,
  doctorOptions,
  newTasks,
  assignedTasks,
  processedTasks,
  fetchState,
  postCreate,
  postDelete
}) {
  const [createTaskModal, openCreateTaskModal] = useState(null);
  const [modifyTaskModal, openModifyTaskModal] = useState(null);
  const [deleteTaskModal, openDeleteTaskModal] = useState(null);
  const [modifyInfoModal, openModifyInfoModal] = useState(null);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  function handleCreateTask(task) {
    openCreateTaskModal(null);
    openModifyTaskModal(null);
    openModifyInfoModal(null);
    postCreate({ Person: person, Task: task });
  }

  function handleDeleteTask(task) {
    openDeleteTaskModal(null);
    postDelete({ Person: person, Task: task });
  }

  return (
	<>
      <Card>
        <Card.Header>
          <Row>
            <Col xs={6}>
              <Card.Title className="font-weight-bold">
                Lausuttavat
              </Card.Title>
            </Col>
            <Col xs={6} style={{textAlign: 'right'}}>
              <Button id="btn-new-task" variant="primary" onClick={() => { openCreateTaskModal(true); }} >Syötä uusi lausuttava</Button>
            </Col>
          </Row>
        </Card.Header>
      </Card>        

	  <ErrorView />
      <Tabs variant="tabs" defaultActiveKey="0" id="lausuttavat">
        <Tab eventKey="0" title="Uudet lausuttavat">
          <Entries  tasks={newTasks} openModifyTaskModal={openModifyTaskModal} openDeleteTaskModal={openDeleteTaskModal} />
      	</Tab>
      	<Tab eventKey="1" title="Keskeneräiset lausuttavat">
      		<IPEntries tasks={assignedTasks} openModifyTaskModal={openModifyTaskModal} openDeleteTaskModal={openDeleteTaskModal} openModifyInfoModal={openModifyInfoModal} />
      	</Tab>
      	<Tab eventKey="2" title="Laskuttamattomat lausuttavat">
      		<NIEntries tasks={processedTasks} person={person}  openModifyTaskModal={openModifyTaskModal} openDeleteTaskModal={openDeleteTaskModal} openModifyInfoModal={openModifyInfoModal} />
      	</Tab>
      	
      </Tabs>
      <Modal
        show={deleteTaskModal != null}
        onHide={() => openDeleteTaskModal(null)}
      >
        <DeleteTaskModal task={deleteTaskModal} dispatch={handleDeleteTask} />
      </Modal>
      <Modal show={modifyTaskModal != null} onHide={() => openModifyTaskModal(null)} >
        <CreateTaskModal
          defaultValue={modifyTaskModal}
          dispatch={handleCreateTask}
          examinationOptions={examinationOptions}
          doctorOptions={doctorOptions}
          title="Muokkaa lisätietoja"
        />
      </Modal>
      <Modal show={modifyInfoModal != null} onHide={() => openModifyInfoModal(null)} >
        <ModifyInfoModal task={modifyInfoModal} dispatch={handleCreateTask} />
      </Modal>
      <Modal show={createTaskModal} onHide={() => openCreateTaskModal(null)}>
        <CreateTaskModal
          dispatch={handleCreateTask}
          examinationOptions={examinationOptions}
          doctorOptions={doctorOptions}
          title="Uusi lausuttava"
        />
      </Modal>
     </>
      );
}

function mapStateToProps(state) {
  return {
    person: state.person,
    errorModal: state.errorModal,
    examinationOptions: state.examinationOptions,
    doctorOptions: state.doctorOptions,
    newTasks: state.newTasks,
    assignedTasks: state.assignedTasks,
    processedTasks: state.processedTasks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchState: () => dispatch(fetchState()),
    postCreate: (params) => dispatch(postCreate(params)),
    postDelete: (params) => dispatch(postDelete(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterView);
