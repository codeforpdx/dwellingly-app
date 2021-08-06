import React from "react";
import axios from "axios";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Settings from "./index";
import UserContext from "../../UserContext";
import Toast from "../../utils/toast"

const mockHistory = createMemoryHistory();

jest.mock("axios");
jest.mock("../../utils/toast")

axios.patch.mockImplementation(() =>
  Promise.resolve({
    data: {
      email: "response@email.com",
      phone: "541-234-5555",
    },
  })
);
jest.mock("../../utils/toast")


const mockSetUser = jest.fn();
const mockRefreshJWT = jest.fn();

const mockAuthenticatedUser = {
  isAuthenticated: true,
  identity: 1,
  email: "test@email.com",
  phone: "555-555-5555",
};

const mockInputEmailEvent = { target: { value: "new@email.com" } };
const mockInputPhoneEvent = { target: { value: "123-456-7890" } };

describe("settings component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <UserContext.Provider
        value={{
          user: mockAuthenticatedUser,
          handleSetUser: mockSetUser,
          refreshJWT: mockRefreshJWT,
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
    const button = view.container.querySelector("button");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);

    await wait(() => fireEvent.click(button));

    expect(axios.patch).toHaveBeenCalled();
  });

  it("should display success alert when PATCH method is successful", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email address/);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone number/);
    const button = view.container.querySelector("button");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);

    await wait(() => fireEvent.click(button));
  
    await wait(() => {
      expect(Toast).toHaveBeenCalledWith("Saved Successfully!", "success")
    })
    
  });

  it("should display error alert when PATCH method is unsuccessful", async () => {
    const errorMessage = 'Network Error';
    axios.patch.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    const emailInput = screen.getByPlaceholderText(/Enter your email address/);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone number/);
    const button = view.container.querySelector("button");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);

    await wait(() => fireEvent.click(button));
    
    await wait(() =>
      expect(Toast).toHaveBeenCalledWith(errorMessage, "error")
    )
    
  });

  it("should display the new input values after successful submission", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email address/);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone number/);
    const button = view.container.querySelector("button");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);

    await wait(() => fireEvent.click(button));

    expect(emailInput.value).toBe("new@email.com");
    expect(phoneInput.value).toBe("123-456-7890");
  });
});
