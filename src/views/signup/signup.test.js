import React from "react";
import axios from 'axios';
import { fireEvent, render, screen, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignupForm from "./signup";
import UserContext from "../../UserContext";

import { MemoryRouter } from "react-router";

jest.mock('axios')
axios.post.mockImplementation(() => Promise.resolve({}))

const mockHistory = { push: jest.fn() };

const mockNotAuthenticatedUser = {
  isAuthenticated: false,
};

const mockInputEvent = { target: { value: "mock value" } };
const mockPassword = { target: {value: "Mock1Password"}};
const mockInputEmailEvent = { target: { value: "mock@mockdomain.com" } };

describe("signup component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: mockNotAuthenticatedUser }}>
          <SignupForm history={mockHistory} />
        </UserContext.Provider>
      </MemoryRouter>
    );
  });
it("should display an error when phone not populated", async () => {
    const button = view.container.querySelector('button');
    await wait(() => fireEvent.click(button));
    expect(await screen.findByText("Phone number is required")).toBeVisible()

  });

  it("should display an error when passwords don't match", async () => {
    const button = view.container.querySelector('button');
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), mockInputEvent);
    await wait(() => fireEvent.click(button));
    expect(await screen.findByText("Passwords must match")).toBeVisible();
  });

  it("should succeed when all fields are valid", async () => {
    const button = view.getByText('SIGN UP');
    fireEvent.change(screen.getByPlaceholderText("First Name"), mockInputEvent);
    fireEvent.change(screen.getByPlaceholderText("Last Name"), mockInputEvent);
    fireEvent.change(screen.getByPlaceholderText("Email"), mockInputEmailEvent);
    fireEvent.change(screen.getByPlaceholderText("Phone"), mockInputEvent);
    fireEvent.change(screen.getByPlaceholderText("Password"), mockPassword);
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), mockPassword);

    await wait(() => fireEvent.click(button));

    expect(axios.post).toHaveBeenCalledWith("/api/register", {
      confirmPassword: mockPassword.target.value,
      email: "mock@mockdomain.com",
      firstName: "mock value",
      lastName: "mock value",
      password: mockPassword.target.value,
      phone: "mock value",
    })

    expect(screen.getByText("Return to Login")).toBeVisible()

  });

});
