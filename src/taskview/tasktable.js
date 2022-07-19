import React from "react";
import { Table } from "react-bootstrap";

import { WeekNumber } from "../utils/week.js";
import { TestRow, TestDates } from "./testrow";

export default function TaskTable({ data, setShow, filter }) {
  let deviceIds = [];
  let list = [];

  if (filter.length > 0) {
    deviceIds = filter.map((filt) => filt.deviceId);

    data.forEach((d) => {
      if (deviceIds.includes(d.deviceId)) {
        list.push(d);
      }
    });
  } else {
    list = data;
  }

  return (
    <Table bordered hover>
      <thead>
        <tr key={-1}>
          <th key={0}>Laitteen nimi</th>
          <th key={1}>Testi</th>
          <th key={2}>Viikko {WeekNumber(new Date(), 0)}</th>
          <th key={3}>Viikko {WeekNumber(new Date(), 1)}</th>
          <th key={4}>Viikko {WeekNumber(new Date(), 2)}</th>
          <th key={5}>Viikko {WeekNumber(new Date(), 3)}</th>
          <th key={6}>Viikko {WeekNumber(new Date(), 4)}</th>
        </tr>
      </thead>
      <tbody>
        {list.map((row) => {
          const rowstyle = {
            backgroundColor: "rgba(0,0,0,.075)",
            fontWeight: "bold"
          };
          if (row.correctiveActionRequired) {
            rowstyle.color = "red";
          }
          return (
            <React.Fragment key={row.deviceId}>
              <tr style={rowstyle} key={row.deviceId}>
                <td>{row.name}</td>
                <td />
                <TestDates dates={row.dates} />
              </tr>
              {row.tests.map((t, i) => {
                return (
                  <TestRow
                    key={row.deviceId + "." + i}
                    device={row}
                    test={t}
                    setShow={setShow}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
}
