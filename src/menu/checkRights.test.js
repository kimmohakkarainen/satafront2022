import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import tieto2State from "../reducers/";
import thunk from "redux-thunk";
import CheckRights from "./checkRights"
import "@testing-library/jest-dom/extend-expect"

const render = (ui, initialStore = {}, options = {}) => {
  const store = createStore(tieto2State, initialStore, applyMiddleware(thunk));
  const Providers = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper: Providers, ...options });
};

it("should return null when given incorrect or no role", () => {
  const { queryByText } = render(<CheckRights tags={["ROLE_ADMIN"]} role="INCORRECT_ROLE"/>)

  expect(queryByText(/Text/)).toBeNull()

})

