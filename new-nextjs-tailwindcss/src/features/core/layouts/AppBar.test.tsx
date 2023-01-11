import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { AppBar } from "src/features/core/layouts/AppBar";
import { RootState } from "src/store";
import { Provider } from "react-redux";

const mockStore = configureStore();
describe("AppBar", () => {
  it.skip("should render a nav if auth token is supplied", () => {
    const initialState: Partial<RootState> = {
      auth: {
        token: "123",
      },
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AppBar />
      </Provider>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it.skip("should not render a nav if auth token is not supplied", () => {
    const initialState: Partial<RootState> = {
      auth: {
        token: null,
      },
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <AppBar />
      </Provider>,
    );
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
