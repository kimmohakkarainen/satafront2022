import moment from "moment";

export const FormatData = (tasklist, filter) => {
  let formattedData = [];
  let id = 0;
  let deviceIds = [];

  if (filter !== undefined) {
    deviceIds = filter.map((filt) => filt.deviceId);
  }

  if (tasklist !== undefined) {
    tasklist.map((task) => {
      if (deviceIds.length > 0) {
        if (deviceIds.includes(task.deviceId)) {
          if (formattedData.length === 0) {
            if (task.dates.length > 0) {
              formattedData = [
                {
                  id: id,
                  testId: -1,
                  name: task.name,
                  description: "",
                  week1: task.dates[0].testDate,
                  week2: task.dates[1].testDate,
                  week3: task.dates[2].testDate,
                  week4: task.dates[3].testDate,
                  week5: task.dates[4].testDate
                }
              ];
            } else {
              formattedData = [
                {
                  id: id,
                  testId: -1,
                  name: task.name,
                  description: "",
                  week1: "",
                  week2: "",
                  week3: "",
                  week4: "",
                  week5: ""
                }
              ];
            }
            id += 1;
          } else {
            if (task.dates.length > 0) {
              formattedData = [
                ...formattedData,
                {
                  id: id,
                  testId: -1,
                  name: task.name,
                  description: "",
                  week1: task.dates[0].testDate,
                  week2: task.dates[1].testDate,
                  week3: task.dates[2].testDate,
                  week4: task.dates[3].testDate,
                  week5: task.dates[4].testDate
                }
              ];
            } else {
              formattedData = [
                ...formattedData,
                {
                  id: id,
                  testId: -1,
                  name: task.name,
                  description: "",
                  week1: "",
                  week2: "",
                  week3: "",
                  week4: "",
                  week5: ""
                }
              ];
            }
            id += 1;
          }
          if (task.tests.length > 0) {
            task.tests.map((test) => {
              formattedData = [
                ...formattedData,
                {
                  id: id,
                  testId: test.testId,
                  name: "",
                  description: test.description,
                  week1: test.dates[0].testDate,
                  week2: test.dates[1].testDate,
                  week3: test.dates[2].testDate,
                  week4: test.dates[3].testDate,
                  week5: test.dates[4].testDate
                }
              ];
              id += 1;
            });
          }
        }
      } else {
        formattedData = [
          ...formattedData,
          {
            id: id,
            testId: -1,
            name: task.name,
            description: "",
            week1: task.dates[0].testDate,
            week2: task.dates[1].testDate,
            week3: task.dates[2].testDate,
            week4: task.dates[3].testDate,
            week5: task.dates[4].testDate
          }
        ];
        id += 1;

        if (task.tests.length > 0) {
          task.tests.map((test) => {
            formattedData = [
              ...formattedData,
              {
                id: id,
                testId: test.testId,
                name: "",
                description: test.description,
                week1: test.dates[0].testDate,
                week2: test.dates[1].testDate,
                week3: test.dates[2].testDate,
                week4: test.dates[3].testDate,
                week5: test.dates[4].testDate
              }
            ];
            id += 1;
          });
        }
      }
    });
  }

  formattedData.map((fd) => {
    if (fd.week1 !== null) {
      fd.week1 = moment(fd.week1).format("DD.MM.YYYY");
    }
    if (fd.week2 !== null) {
      fd.week2 = moment(fd.week2).format("DD.MM.YYYY");
    }
    if (fd.week3 !== null) {
      fd.week3 = moment(fd.week3).format("DD.MM.YYYY");
    }
    if (fd.week4 !== null) {
      fd.week4 = moment(fd.week4).format("DD.MM.YYYY");
    }
    if (fd.week5 !== null) {
      fd.week5 = moment(fd.week5).format("DD.MM.YYYY");
    }
  });

  return formattedData;
};
