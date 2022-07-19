import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

import { WeekNumber } from "../utils/week.js";

export default function TaskTable({ data, setShow }) {
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
          const rowstyle = {
            backgroundColor: "rgba(0,0,0,.075)",
            fontWeight: "bold"
          };
          if (row.correctiveActionRequired) {
            rowstyle.color = "red";
          }
          return (
            <>
              <tr style={rowstyle} key={"d" + row.deviceId}>
                <td key={-2}>{row.name}</td>
                <td key={-1} />
                {row.dates.map((d, i) => {
                  if (d.testDate === null) return <td key={i} />;
                  else
                    return (
                      <td key={i}>{moment(d.testDate).format("DD.MM.YYYY")}</td>
                    );
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
                  <tr
                    style={style}
                    key={row.deviceId + "." + t.testId}
                    onClick={() => setShow(t.testId)}
                  >
                    <td />
                    <td>{t.description}</td>
                    {t.dates.map((d, i) => {
                      if (d.testDate === null) return <td key={i} />;
                      else
                        return (
                          <td key={i}>
                            {moment(d.testDate).format("DD.MM.YYYY")}
                          </td>
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
