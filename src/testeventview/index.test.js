import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import tieto2State from "../reducers/";
import thunk from "redux-thunk";
import ListTestEvents from "./index"
import "@testing-library/jest-dom/extend-expect"

const tests = 
    {
      "deviceId": 1,
      "name": "yksi",
      "serialNumber": "45TX23408-UZ",
      "yearOfCommission": "2011",
      tests: [
        {
          "testId": 1,
          "deviceId": 1,
          "description": "kuvapinnan tasaisuus",
          "reqValue": 1,
          "reqUnit": "MONTHS",
          "setStart": "2020-01-01",
          "setValue": 30,
          "setUnit": "MONTHS",
          "measurements": [
            {
              "measurementId": 1,
              "testId": 1,
              "description": "leveys",
              "acceptanceLimitLow": -0.12,
              "acceptanceLimitHigh": 1.02,
              "setLimitLow": 0.05,
              "setLimitHigh": 0.98,
              "unit": "mm"
            },
            {
              "measurementId": 2,
              "testId": 1,
              "description": "korkeus",
              "acceptanceLimitLow": 99.5,
              "acceptanceLimitHigh": 100.5,
              "setLimitLow": 99.8,
              "setLimitHigh": 100.2,
              "unit": "mm"
            }
          ],
          "testEvents": [],
          "tags": []
        },
        {
          "testId": 2,
          "deviceId": 1,
          "description": "sadflj QEWr",
          "reqValue": 3,
          "reqUnit": "MONTHS",
          "setStart": "2020-01-03",
          "setValue": 2,
          "setUnit": "MONTHS",
          "measurements": [
            {
              "measurementId": 3,
              "testId": 2,
              "description": "leveys",
              "acceptanceLimitLow": -0.12,
              "acceptanceLimitHigh": 1.02,
              "setLimitLow": 0.05,
              "setLimitHigh": 0.98,
              "unit": "mm"
            },
            {
              "measurementId": 4,
              "testId": 2,
              "description": "korkeus",
              "acceptanceLimitLow": 99.5,
              "acceptanceLimitHigh": 100.5,
              "setLimitLow": 99.8,
              "setLimitHigh": 100.2,
              "unit": "mm"
            }
          ],
          "testEvents": [],
          "tags": []
        }
      ],
      "tags": [
        "KAIKKI LAITTEET"
      ]
    }

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(tieto2State, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};

it("should show display information about tests when present", () => {
  const { queryByText } = render(<ListTestEvents tests={tests} activeDevice={1}/>)

  expect(queryByText(/Testin tunniste/)).toBeInTheDocument
  expect(queryByText(/kuvapinnan tasaisuus/)).toBeInTheDocument
  expect(queryByText(/1/)).toBeInTheDocument
  expect(queryByText(/2/)).toBeInTheDocument
})

it("should display 'Ei valittu' when activeDevice is not defined", () => {
  const { queryByText } = render(<ListTestEvents tests={tests}/>)

  expect(queryByText(/Ei valittu/)).toBeInTheDocument
})

it("should display form when clicked", () => {
  const { queryByText } = render(<ListTestEvents tests={tests} activeDevice={1}/>)

  expect(queryByText(/Alaraja/)).toBeInTheDocument
  expect(queryByText(/Lisää kommentti/)).toBeInTheDocument
})
