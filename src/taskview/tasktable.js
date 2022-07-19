import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

import { WeekNumber } from "../utils/week.js";

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
            <>
              <tr style={rowstyle} key={"d" + row.deviceId}>
                <td>{row.name}</td>
                <td />
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
