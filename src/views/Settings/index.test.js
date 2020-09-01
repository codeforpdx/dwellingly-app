import React from "react";
import axios from "axios";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Settings from "./index";
import UserContext from "../../UserContext";

const mockHistory = createMemoryHistory();
jest.spyOn(axios, "patch").mockResolvedValue({});

const mockAuthenticatedUser = {
  isAuthenticated: true,
  identity: 1,
  email: "test@email.com",
  phone: "555-555-5555",
};

const mockInputEmailEvent = {target: {value: "new@email.com"}};
const mockInputPhoneEvent = {target: {value: "123-456-7890"}};

describe("settings component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <UserContext.Provider value={{ user: mockAuthenticatedUser }}>
        <Router history={mockHistory}>
          <Settings />
        </Router>
      </UserContext.Provider>
    );
  });

  it("should render without errors", async () => {
    expect(screen.getByText("SAVE")).toBeInTheDocument();
  });

  // Need help figuring out how to get this test to pass!
  it.only("should make an API patch call when form is submitted", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email address/);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone number/);
    const saveButton = screen.getByText("SAVE");

    fireEvent.change(emailInput, mockInputEmailEvent);
    fireEvent.change(phoneInput, mockInputPhoneEvent);

    await wait(() => fireEvent.click(saveButton));

    screen.debug();

    expect(axios.patch).toHaveBeenCalled();
  });

  it("should display success alert when PATCH method is successful", () => {
    // TODO
  });
  
  it("should display error alert when PATCH method is unsuccessful", () => {
    // TODO
  });
  
  it("should display the new input values after successful submission", () => {
    // TODO
  });

});
