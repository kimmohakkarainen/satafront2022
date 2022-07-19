import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

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
          return (
            <>
              <tr
                style={{
                  backgroundColor: "rgba(0,0,0,.075)",
                  fontWeight: "bold"
                }}
              >
                <td>{row.name}</td>
                <td />
                {row.dates.map((d) => {
                  if (d.testDate === null) return <td />;
                  else
                    return <td>{moment(d.testDate).format("DD.MM.YYYY")}</td>;
                })}
              </tr>
              {row.tests.map((t) => {
                const style = {
                  backgroundColor: "transparent"
                };
                if (t.withinSet === false) {
                  style.color = "#f5c242";
                }
                if (t.withinAcceptance === false) {
                  style.color = "red";
                }
                return (
                  <tr style={style}>
                    <td />
                    <td>{t.description}</td>
                    {t.dates.map((d) => {
                      if (d.testDate === null) return <td />;
                      else
                        return (
                          <td>{moment(d.testDate).format("DD.MM.YYYY")}</td>
                        );
                    })}
                  </tr>
                );
              })}
            </>
          );
        })}
      </tbody>
    </Table>
  );
}
