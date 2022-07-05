import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import tieto2State from "../reducers/";
import thunk from "redux-thunk";
import TaskView from "./index"
import "@testing-library/jest-dom/extend-expect"

const tasklist = [
  {
    deviceId: 1,
    name: "yksi",
    correctiveActionRequired: false,
    dates: [
      {
        dateType: "WEEK",
        testDate: "2021-05-30"
      },
      {
        dateType: "WEEK",
        testDate: null
      },
      {
        dateType: "WEEK",
        testDate: null
      },
      {
        dateType: "WEEK",
        testDate: null
      },
      {
        dateType: "WEEK",
        testDate: null
      }
    ],
    tests: [
      {
        testId1: 1,
        desription: "kuvapinnan tasaisuus",
        correctiveActionRequired: false,
        withinAcceptance: true,
        dates: [
          {
            dateType: "WEEK",
            testDate: null,
          },
          {
            dateType: "WEEK",
            testDate: null
          },
          {
            dateType: "WEEK",
            testDate: null
          },
          {
            dateType: "WEEK",
            testDate: null
          },
          {
            dateType: "WEEK",
            testDate: null
          }
        ]
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

it("should show 'Viikko' multiple times", () => {
  const { queryAllByText } = render(<TaskView />)

  expect(queryAllByText(/Viikko/)).toBeInTheDocument
})

it("should render all the devices names and 'Tehtäviä' when there are tasks to be done", () => {

  const { queryByText } = render(<TaskView tasklist={tasklist}/>)

  expect(queryByText(/Tehtäviä/)).toBeInTheDocument
  expect(queryByText(/yksi/)).toBeInTheDocument

})

it("should have tasks title showing", () => {

  const { queryByText } = render(<TaskView tasklist={tasklist}/>)

  expect(queryByText(/kuvapinnan tasaisuus/)).toBeInTheDocument

})
