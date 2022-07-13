import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

export default function ContentMarkerTable({ columns, data }) {
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
            <tr>
              <td>{row.taskId}</td>
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
