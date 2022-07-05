import { fireEvent, queryByText, render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import tieto2State from "../reducers/";
import thunk from "redux-thunk";
import TestNew from "./testNew"
import "@testing-library/jest-dom/extend-expect"

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(tieto2State, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};

it("should render 'Testin kuvaus' and form of measures when clicked", () => {
  const { getByText } = render(<TestNew />)

  fireEvent.click(getByText(/Lisää testi/))
  expect(getByText(/Testin kuvaus/)).toBeInTheDocument
  expect(getByText(/Rivi/)).toBeInTheDocument
})

it("should render two rows", () => {
  const { getByText } = render(<TestNew />)

  fireEvent.click(getByText(/Lisää testi/))
  expect(getByText(/1/)).toBeInTheDocument
  fireEvent.click(getByText(/Lisää rivi/))
  expect(getByText(/1/)).toBeInTheDocument
  expect(getByText(/2/)).toBeInTheDocument
})

it("should add two rows and delete one row", () => {
  const { queryByText, getByText } = render(<TestNew />)

  fireEvent.click(getByText(/Lisää testi/))
  expect(getByText(/1/)).toBeInTheDocument
  fireEvent.click(getByText(/Lisää rivi/))
  fireEvent.click(getByText(/Lisää rivi/))
  expect(getByText(/2/)).toBeInTheDocument
  expect(getByText(/3/)).toBeInTheDocument
  fireEvent.click(getByText(/Poista viimeisin rivi/))
  expect(queryByText(/3/)).not.toBeInTheDocument
})

it("should not render 'Lisää testi' when there are missing info in the form", () => {
  const { queryByText, getByText } = render(<TestNew />)

  fireEvent.click(getByText(/Lisää testi/))
  fireEvent.click(getByText(/Hyväksy mitattavat/))
  expect(queryByText(/Hyväksy mitattavat/)).toBeInTheDocument
})
