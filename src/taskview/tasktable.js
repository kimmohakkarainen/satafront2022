import React from "react";
import { Table } from "react-bootstrap";

import { WeekNumber } from "../utils/week.js";

export default function TaskTable({ data }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Laitteen nimi</th>
          <th>Testi</th>
          <th>Viikko {WeekNumber(new Date(), 0)}</th>
          <th>Viikko {WeekNumber(new Date(), 1)}</th>
          <th>Viikko {WeekNumber(new Date(), 2)}</th>
          <th>Viikko {WeekNumber(new Date(), 3)}</th>
          <th>Viikko {WeekNumber(new Date(), 4)}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          console.log(row);
          return (
            <tr>
              <td>{row.name}</td>
              <td>{row.description}</td>
              <td>{row.week1}</td>
              <td>{row.week2}</td>
              <td>{row.week3}</td>
              <td>{row.week4}</td>
              <td>{row.week5}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
