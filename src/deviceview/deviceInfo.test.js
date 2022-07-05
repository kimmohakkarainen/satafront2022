import React from "react"
import { render as rtlRender, screen } from "@testing-library/react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import tieto2State from "../reducers"
import DeviceInfo from "./deviceInfo"
import "@testing-library/jest-dom"

const devices = [
  {
    deviceId: 1,
    name: "yksi",
    serialNumber: "45TX23408-UZ",
    yearOfCommission: "2011"
  }
]

const tests = [
  {
    deviceId: 1,
    name: "Laite 1",
    serialNumber: "111 11 111",
    yearOfCommission: "2020",
    tests: [
      {
        testId: 1,
        description: "Testi 1",
        setExecutionFrequency: 1,
        setLimitLow: 0,
        setLimitHight: 10,
        unit: "mm"
      }, {
        testId: 2,
        description: "Testi 2",
        setExecutionFrequency: 2,
        setLimitLow: 0,
        setLimitHight: 10,
        unit: "mm"
      }
    ]
  },
  {
    deviceId: 2,
    name: "Laite 2",
    serialNumber: "222 22 222",
    yearOfCommission: "2021",
    tests: [
      {
        testId: 3,
        description: "Testi 3",
        setExecutionFrequency: 3,
        setLimitLow: 0,
        setLimitHight: 10,
        unit: "mm"
      }, {
        testId: 4,
        description: "Testi 4",
        setExecutionFrequency: 4,
        setLimitLow: 0,
        setLimitHight: 10,
        unit: "mm"
      }
    ]
  }
]

function render(
  ui,
  {
    initialState,
    store = createStore(tieto2State, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

describe("DeviceInfo", () => {
  it("Should render info of device with id 1", () => {
    render(<DeviceInfo />, { initialState: { devices: devices, tests: tests, activeDevice: 1} })
    expect(screen.getByText(/yksi/)).toBeInTheDocument()
    expect(screen.getByText(/45TX23408-UZ/)).toBeInTheDocument()
  })

  it("Should not render info of device with id 1 when active device is something else", () => {
    render(<DeviceInfo />, { initialState: { devices: devices, tests: tests, activeDevice: 2} })
    expect(screen.queryByText(/yksi/)).not.toBeInTheDocument()
  })
})