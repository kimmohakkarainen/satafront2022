import React from "react"
import { render as rtlRender, screen } from "@testing-library/react"
import { createStore} from "redux"
import { Provider } from "react-redux"
import tieto2State from "../reducers"
import DeviceList from "./deviceList"
import "@testing-library/jest-dom"

const devices = {devices: [
  {deviceId: 1, name: "Laite 1"},
  {deviceId: 2, name: "Laite 2"},
  {deviceId: 3, name: "Laite 3"},
  {deviceId: 4, name: "Laite 4"},
  {deviceId: 5, name: "Laite 5"},
]}

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

describe("DeviceList", () => {
  it("Should render all the devices in the store", () => {
    render(<DeviceList />, { initialState: devices})
    expect(screen.getByText(/Laite 1/)).toBeInTheDocument()
    expect(screen.getByText(/Laite 5/)).toBeInTheDocument()
  })
})