import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ForgotPassword from "../index";

const mockHistory = createMemoryHistory();

jest.mock("axios");
axios.post.mockImplementation(() => Promise.resolve());

const mockInputEmailEvent = { target: { value: "new@email.com" } };
const mockInputIncorrectEmailEvent = { target: { value: "userEmailNotInDatabase@email.com" } };

describe("ForgotPassword component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <Router history={mockHistory}>
        <ForgotPassword />
      </Router>
    );
  });

  it("should render without errors", async () => {
    expect(
      screen.getByText("REQUEST EMAIL PASSWORD RESET")
    ).toBeInTheDocument();
  });

  it("should make an API call when form is submitted", async () => {
    const emailInput = screen.getByPlaceholderText(
      /Please enter your email address/
    );
    fireEvent.change(emailInput, mockInputEmailEvent);
    const button = view.container.querySelector("button");

    await wait(() => fireEvent.click(button));

    expect(axios.post).toHaveBeenCalled();
  });

  it("should display success modal when API call is successful", async () => {
    // TODO once we're able to mock the backend to suppress email sends
  });

  it("should display error modal when API call is unsuccessful", async () => {
    axios.post.mockImplementationOnce(() => Promise.reject());
    const emailInput = screen.getByPlaceholderText(
      /Please enter your email address/
    );
    fireEvent.change(emailInput, mockInputIncorrectEmailEvent);
    const button = view.container.querySelector("button");

    await wait(() => fireEvent.click(button));
    const errorHeading = screen.getByText(/Error!/);
    expect(errorHeading).toBeInTheDocument();
  });
});
