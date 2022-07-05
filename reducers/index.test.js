import tieto2State from "./index";

describe("tieto2State", () => {
  it("Should return default state", () => {
    const newState = tieto2State(undefined, {});
    expect(newState).toEqual({
      devices: [],
      tests: [],
      allTests: [],
      incidents: [],
      tasklist: [],
      activeDevice: null,
      persons: [],
      tags: []
    });
  });

  it("Should return new state according to payload", () => {
    const data = [
      {
        deviceId: 1,
        deviceName: "Laite 1",
        serialNumber: "11 111 1",
        yearOfCommission: "2020"
      },
      {
        deviceId: 2,
        deviceName: "Laite 2",
        serialNumber: "22 222 2",
        yearOfCommission: "2021"
      }
    ];

    const returnedData = {
      devices: data,
      tests: [],
      allTests: [],
      incidents: [],
      tasklist: [],
      activeDevice: null,
      persons: [],
      tags: []
    };

    const newState = tieto2State(undefined, {
      type: "FETCH_DEVICES_SUCCEEDED",
      payload: { devices: data }
    });
    expect(newState).toStrictEqual(returnedData);
  });
});
