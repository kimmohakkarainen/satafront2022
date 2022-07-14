import React from "react";
import { Table } from "react-bootstrap";

export default function InvoiceTable({ data }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Lääkäri</th>
          <th>Tutkimus</th>
          <th>Lääkärin korvaus yht.</th>
          <th>Laskutettava yhteensä</th>
          <th>Lkm</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.taskId}>
              <td>{row.doctor}</td>
              <td>{row.examination}</td>
              <td>{row.dpart}</td>
              <td>{row.sum}</td>
              <td>{row.count}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
