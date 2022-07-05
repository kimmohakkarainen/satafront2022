import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";

import { fetchState, postCreate, postFinish, postUnassign } from "../actions"

import ModifyMessageModal from "./modifyMessageModal"
import UnassignTaskModal from "./unassignTaskModal";
import FinishTaskModal from "./finishTaskModal";

const InProgressEntries = ({ fetchState, ownTasks, person, postCreate, postFinish, postUnassign }) => {

  const [modifyMessageModalShow, setModifyMessageModalShow] = useState(false)
  const [unassignTaskModalShow, setUnassignTaskModalShow] = useState(false)
  const [finishTaskModalShow, setFinishTaskModalShow] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    fetchState()
  }, [fetchState])

  const handleFinishClick = (task) => {
    setFinishTaskModalShow(true)
    setCurrentTask(task)
  }

  const handleModifyClick = (task) => {
    setModifyMessageModalShow(true)
    setCurrentTask(task)
  }

  const handleUnassignClick = (task) => {
    setUnassignTaskModalShow(true)
    setCurrentTask(task)
  }

  const handleFinishTask = () => {
    setFinishTaskModalShow(false)
    postFinish({Person: person, Task: currentTask})
  }

  const handleCreateTask = (task) => {
    setModifyMessageModalShow(false)
    const tCurrTask = currentTask
    if (task !== null) {
      tCurrTask.viesti = task
    }
    postCreate({ Person: person, Task: tCurrTask })
  }

  const handleUnassignTask = () => {
    console.log(person)
    postUnassign({ Person: person, Task: currentTask })
    setUnassignTaskModalShow(false)
  }

  return (
    <>
      {ownTasks.length > 0 && (
        <Table striped condensed hover>
          <thead>
            <tr>
              <th></th>
              <th>Potilaan vastaanottopäivä</th>
              <th>Tutkimus</th>
              <th>Esitietolomake</th>
              <th>Potilaan henkilötunnus</th>
              <th>Potilaan sukunimi</th>
              <th>Tutkimuksesta lisätiedot</th>
            </tr>
          </thead>
          <tbody id="table-inprogress">
            {ownTasks.map(task => {
              const syntymaaika = task.hetu === null ? "" : task.hetu;
              const tutkimus = task.tutkimus === null ? "" : task.tutkimus.label;
              const btnid = 'btn-finish-' + task.taskId;
              const infoid = 'btn-info-' + task.taskId;
              const unassignid = 'btn-unassign-' + task.taskId;
              const lisatiedot = task.lisatiedot === null ? '' : task.lisatiedot;
              const viesti = task.viesti === null ? '' : task.viesti;
              const infobuttonvariant = viesti ==='' ? 
              		( lisatiedot === '' ? 'secondary' : 'success' ) 
              		: 'warning';

              return (
                <tr key={task.taskId}>
                  <td>
                    <Button id={btnid} variant="primary" onClick={() => handleFinishClick(task)}>Valmis</Button>
                  </td>
                  <td>{task.vastaanottoPaiva}</td>
                  <td>{tutkimus}</td>
                  <td>{task.esitietolomake}</td>
                  <td>{syntymaaika}</td>
                  <td>{task.sukunimi}</td>
                  <td>
                    <Button id={infoid} variant={infobuttonvariant} onClick={() => handleModifyClick(task)}>Lisätiedot</Button>
                  </td>
                  <td>
                    <Button id={unassignid} variant="warning" onClick={() => handleUnassignClick(task)}>Vapauta</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}

      <Modal show={modifyMessageModalShow} onHide={() => setModifyMessageModalShow(false)}>
        <ModifyMessageModal info={currentTask} handleCreateTask={handleCreateTask} />
      </Modal>
      <Modal show={unassignTaskModalShow} onHide={() => setUnassignTaskModalShow(false)}>
        <UnassignTaskModal info={currentTask} handleUnassignTask={handleUnassignTask} />
      </Modal>
      <Modal show={finishTaskModalShow} onHide={() => setFinishTaskModalShow(false)}>
        <FinishTaskModal info={currentTask} handleFinishTask={handleFinishTask} />
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    person: state.person,
    ownTasks: state.ownTasks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchState: () => dispatch(fetchState()),
    postCreate: (Task) => dispatch(postCreate(Task)),
    postUnassign: (Person, Task) => dispatch(postUnassign(Person, Task)),
    postFinish: (Person, Task) => dispatch(postFinish(Person, Task))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(InProgressEntries);
