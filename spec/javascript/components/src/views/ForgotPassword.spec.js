import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ForgotPassword from "components/src/views/ForgotPassword/index";
import UserContext from "components/src/contexts/UserContext"

const mockHistory = createMemoryHistory();

const apiCall = jest.fn().mockReturnValue(Promise.resolve({ data: {} }))

const mockInputEmailEvent = { target: { value: "new@email.com" } };

describe("ForgotPassword component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <Router history={mockHistory}>
        <UserContext.Provider value={{ apiCall: apiCall }}>
          <ForgotPassword />
        </UserContext.Provider>
      </Router>
    );
  });

  it("should render without errors", async () => {
    expect(
      screen.getByText("REQUEST EMAIL PASSWORD RESET")
    ).toBeInTheDocument();
  });

  it("should make an API call when form is submitted", async () => {
    fireEvent.change(screen.getByPlaceholderText(/Please enter your email address/), mockInputEmailEvent);
    const button = view.container.querySelector("button");

    await wait(() => fireEvent.click(button));

    expect(apiCall).toHaveBeenCalled();
  });
});
