import React from "react";
import { Row, Table, Button } from "react-bootstrap";

function IPEntriesTable({
  tasks,
  openModifyTaskModal,
  openModifyInfoModal
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th />
          <th>Lääkäri</th>
          <th>Tutkimus</th>
          <th>Potilaan vast.otto</th>
          <th>Potilaan henkilötunnus</th>
          <th>Potilaan sukunimi</th>
          <th />
        </tr>
      </thead>
      <tbody id='table-inprogress'>
        {tasks.map(function (task) {
          const laakari = task.laakari == null ? "" : task.laakari.label;
          const syntymaaika = task.hetu == null ? "" : task.hetu;
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.label;
          return (
            <tr key={task.taskId}>
              <td>
                <Button
                  name="muokkaa"
                  variant="primary"
                  onClick={() => {
                    openModifyTaskModal(task);
                  }}
                >
                  Muokkaa
                </Button>
              </td>
              <td>{laakari}</td>
              <td>{tutkimus}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
              <td>
                {task.viesti != null && (
                  <Button
                    variant="warning"
                    onClick={() => {
                      openModifyInfoModal(task);
                    }}
                  >
                    Viesti
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default function IPEntries({
  tasks,
  openModifyTaskModal,
  openModifyInfoModal
}) {

	if(tasks == null || tasks.length == 0) {
		return <Row className="justify-content-sm-center"><div><i>Ei keskeneräisiä lausuttavia</i></div></Row>;
	} else {
		return IPEntriesTable({ tasks, openModifyTaskModal, openModifyInfoModal });
	}
}
	
	
