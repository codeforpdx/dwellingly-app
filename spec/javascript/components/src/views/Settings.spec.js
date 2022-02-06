import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Settings from "components/src/views/Settings/index";
import UserContext from "components/src/contexts/UserContext"

const mockHistory = createMemoryHistory();

const userParams = { email: "response@email.com", phone: "541-234-5555" }
let apiCall = jest.fn().mockReturnValue(Promise.resolve({ data: userParams }))

const mockSetUser = jest.fn();

const mockAuthenticatedUser = {
  isAuthenticated: true,
  identity: 1,
  email: "test@email.com",
  phone: "555-555-5555",
};

const mockInputEmailEvent = { target: { value: "new@email.com" } };
const mockInputPhoneEvent = { target: { value: "123-456-7890" } };
const password = { target: { value: "secret password" } };

describe("settings component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <UserContext.Provider
        value={{
          user: mockAuthenticatedUser,
          handleSetUser: mockSetUser,
          apiCall: apiCall,
        }}
      >
        <Router history={mockHistory}>
          <Settings />
        </Router>
      </UserContext.Provider>
    );
  });

  it("should render without errors", async () => {
    expect(screen.getByText("SAVE")).toBeInTheDocument();
  });

  it("should make an API patch call when form is submitted", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email address/);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone number/);
    const currentPassword = screen.getByPlaceholderText(/Enter your current password/);

    const button = view.container.querySelector("button");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);
    fireEvent.change(currentPassword, password)

    await wait(() => fireEvent.click(button));

    expect(apiCall).toHaveBeenCalled();
  });

  it("should display the new input values after successful submission", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email address/);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone number/);
    const currentPassword = screen.getByPlaceholderText(/Enter your current password/);
    const button = view.container.querySelector("button");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);
    fireEvent.change(currentPassword, password)

    await wait(() => fireEvent.click(button));

    expect(emailInput.value).toBe("new@email.com");
    expect(phoneInput.value).toBe("123-456-7890");
  });
});
