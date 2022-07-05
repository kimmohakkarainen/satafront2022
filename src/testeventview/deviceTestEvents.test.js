import { render as rtlRender } from "@testing-library/react"
import { createStore, applyMiddleware  } from "redux"
import { Provider } from "react-redux"
import tieto2State from "../reducers"
import thunk from "redux-thunk";
import DeviceTestEvents from "./deviceTestEvents"
import "@testing-library/jest-dom"

const deviceTestEvents = [
  {
    "testEventId": 4,
    "testId": 2,
    "date": "2021-03-23",
    "personId": 1,
    "comments": "ei kommenttia",
    "results": [
      {
        "measurementId": 3,
        "testId": 2,
        "resultId": 7,
        "description": "leveys",
        "acceptanceLimitLow": -0.12,
        "acceptanceLimitHigh": 1.02,
        "value": 1,
        "setLimitLow": 0.05,
        "setLimitHigh": 0.98,
        "unit": "mm"
      },
      {
        "measurementId": 4,
        "testId": 2,
        "resultId": 8,
        "description": "korkeus",
        "acceptanceLimitLow": 99.5,
        "acceptanceLimitHigh": 100.5,
        "value": 99.9,
        "setLimitLow": 99.8,
        "setLimitHigh": 100.2,
        "unit": "mm"
      }
    ]
  },
  {
    "testEventId": 2,
    "testId": 1,
    "date": "2021-04-30",
    "personId": 2,
    "comments": "hyvalta nayttaa",
    "results": [
      {
        "measurementId": 1,
        "testId": 1,
        "resultId": 3,
        "description": "leveys",
        "acceptanceLimitLow": -0.12,
        "acceptanceLimitHigh": 1.02,
        "value": 0.97,
        "setLimitLow": 0.05,
        "setLimitHigh": 0.98,
        "unit": "mm"
      },
      {
        "measurementId": 2,
        "testId": 1,
        "resultId": 4,
        "description": "korkeus",
        "acceptanceLimitLow": 99.5,
        "acceptanceLimitHigh": 100.5,
        "value": 100.1,
        "setLimitLow": 99.8,
        "setLimitHigh": 100.2,
        "unit": "mm"
      }
    ]
  },
  {
    "testEventId": 1,
    "testId": 1,
    "date": "2021-05-23",
    "personId": 2,
    "comments": "hyvalta nayttaa",
    "results": [
      {
        "measurementId": 1,
        "testId": 1,
        "resultId": 1,
        "description": "leveys",
        "acceptanceLimitLow": -0.12,
        "acceptanceLimitHigh": 1.02,
        "value": 0.974,
        "setLimitLow": 0.05,
        "setLimitHigh": 0.98,
        "unit": "mm"
      },
      {
        "measurementId": 2,
        "testId": 1,
        "resultId": 2,
        "description": "korkeus",
        "acceptanceLimitLow": 99.5,
        "acceptanceLimitHigh": 100.5,
        "value": 100.12,
        "setLimitLow": 99.8,
        "setLimitHigh": 100.2,
        "unit": "mm"
      }
    ]
  },
  {
    "testEventId": 3,
    "testId": 2,
    "date": "2021-05-30",
    "personId": 1,
    "comments": "ei kommenttia",
    "results": [
      {
        "measurementId": 3,
        "testId": 2,
        "resultId": 5,
        "description": "leveys",
        "acceptanceLimitLow": -0.12,
        "acceptanceLimitHigh": 1.02,
        "value": 1,
        "setLimitLow": 0.05,
        "setLimitHigh": 0.98,
        "unit": "mm"
      },
      {
        "measurementId": 4,
        "testId": 2,
        "resultId": 6,
        "description": "korkeus",
        "acceptanceLimitLow": 99.5,
        "acceptanceLimitHigh": 100.5,
        "value": 99.9,
        "setLimitLow": 99.8,
        "setLimitHigh": 100.2,
        "unit": "mm"
      }
    ]
  }
]

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(tieto2State, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};


describe("DeviceTestEvents", () => {
  it("Should render tests in the list", () => {
    const { queryByText } = render(<DeviceTestEvents deviceTestEvents={deviceTestEvents}/>)
    expect(queryByText(/2021-03-23/)).toBeInTheDocument
    expect(queryByText(/ei kommenttia/)).toBeInTheDocument
    expect(queryByText(/hyvalta nayttaa/)).toBeInTheDocument
  })

  it("Should render nothing when tests is empty", () => {
    const list = undefined
    const { queryByText } = render(<DeviceTestEvents deviceTestEvents={list}/>)
    expect(queryByText(/Päiväys/)).not.toBeInTheDocument
  })
})