import React from "react";
import { Row, Table, Button } from "react-bootstrap";

function NIEntriesTable({
  tasks,
  person,
  openModifyTaskModal,
  openDeleteTaskModal
}) {
  const USER_IS_ADMIN = person != null ? person.tags.some(role => role === "ROLE_ADMIN") : false;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {USER_IS_ADMIN && (
            <th />
          )}
          <th>Lääkäri</th>
          <th>Tutkimus</th>
          <th>Potilaan vast.otto</th>
          <th>Potilaan henkilötunnus</th>
          <th>Potilaan sukunimi</th>
        </tr>
      </thead>
      <tbody id="table-notinvoiced">
        {tasks.map(function (task) {
          const laakari = task.laakari == null ? "" : task.laakari.label;
          const syntymaaika = task.hetu == null ? "" : task.hetu;
          const tutkimus = task.tutkimus == null ? "" : task.tutkimus.label;
          const admin = person == null ? false : person.tags.some(role => role === "ROLE_ADMIN");
          return (
            <tr key={task.taskId}>
              {admin && (
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      openModifyTaskModal(task);
                    }}
                  >
                    Palauta Lausuttavaksi
                  </Button>
                </td>
              )}
              <td>{laakari}</td>
              <td>{tutkimus}</td>
              <td>{task.vastaanottoPaiva}</td>
              <td>{syntymaaika}</td>
              <td>{task.sukunimi}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default function NIEntries({
  tasks,
  person,
  openModifyTaskModal,
  openDeleteTaskModal
}) {

	if(tasks == null || tasks.length == 0) {
		return <Row className="justify-content-sm-center"><div><i>Ei laskuttamattomia lausuttavia</i></div></Row>;
	} else {
		return NIEntriesTable({tasks, person, openModifyTaskModal, openDeleteTaskModal});
	}
}
