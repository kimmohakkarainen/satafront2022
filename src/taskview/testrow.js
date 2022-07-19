import React from "react";
import moment from "moment";

export function TestDates({ dates }) {
  return dates.map((d, i) => {
    if (d.testDate === null) return <td key={i} />;
    else return <td key={i}>{moment(d.testDate).format("DD.MM.YYYY")}</td>;
  });
}

export function TestRow({ device, test, setShow }) {
  const style = {
    backgroundColor: "transparent"
  };
  if (test.withinSet === false) {
    style.color = "#f5c242";
  }
  if (test.withinAcceptance === false) {
    style.color = "red";
  }
  return (
    <tr
      style={style}
      key={device.deviceId + "." + test.testId}
      onClick={() => setShow(test.testId)}
    >
      <td />
      <td>{test.description}</td>
      <TestDates dates={test.dates} />
    </tr>
  );
}
