import React from "react";
import { Table, Button } from "react-bootstrap";

const ButtonFormatter = ({ row, showAll, addContentmarker, person }) => {
  return (
    <>
      {showAll === false && (
        <Button
          id={`taskid-${row.taskId}`}
          onClick={() => addContentmarker(person, row)}
        >
          Kuittaa
        </Button>
      )}
      {showAll === true && (
        <>
          {row.contentMarker && (
            <Button variant="success" active>
              OK
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default function ContentMarkerTable({
  showAll,
  columns,
  data,
  person,
  addContentmarker
}) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Sisältömerkintä</th>
          <th>Tutkimuspäivä</th>
          <th>Tutkimus</th>
          <th>Potilaan henkilötunnus</th>
          <th>Potilaan sukunimi</th>
          <th>Potilaan vastaanotto</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.taskId}>
              <td>
                <ButtonFormatter
                  row={row}
                  showAll={showAll}
                  person={person}
                  addContentmarker={addContentmarker}
                />
              </td>
              <td>{row.tutkimusPaiva}</td>
              <td>{row.tutkimus.label}</td>
              <td>{row.hetu}</td>
              <td>{row.sukunimi}</td>
              <td>{row.vastaanottoPaiva}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
