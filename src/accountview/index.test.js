import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import tieto2State from "../reducers/";
import thunk from "redux-thunk";
import AccountView from "./index"
import "@testing-library/jest-dom/extend-expect"


const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(tieto2State, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};

it("should display 'Käyttäjätiedot' by default", () => {
  const person = {
    "personId": 3,
    "version": 0,
    "username": "topi",
    "email": "topi@atoz.fi",
    "fullname": "tr",
    "password": "$2a$10$dNNFgeKc8aIsi3CfpHPqFub8fKazPQs7/y43k5MFH6UJ1Bbjx7fNG",
    "tags": [
      "ROLE_SECRETARY",
      "ROLE_DEVICE",
      "ROLE_DEVICETEST"
    ]
  }

  const { queryByText } = render(<AccountView person={person} persons={[]} state={[]}/>)

  expect(queryByText(/Käyttäjätiedot/)).toBeInTheDocument
})
