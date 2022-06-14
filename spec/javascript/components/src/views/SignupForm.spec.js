import React from "react"
import { fireEvent, render, screen, wait } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import SignupForm from "components/src/views/Signup/index"
import UserContext from "components/src/contexts/UserContext"

import { MemoryRouter } from "react-router"

let apiCall = jest.fn().mockReturnValue(Promise.resolve({ data: "success" }))

const mockHistory = { push: jest.fn() }

const mockNotAuthenticatedUser = {
  isAuthenticated: false,
}

const mockInputEvent = { target: { value: "mock value" } }
const mockPassword = { target: {value: "Mock1Password"}}
const mockInputEmailEvent = { target: { value: "mock@mockdomain.com" } }

describe("signup component", () => {
  let view = null

  beforeEach(() => {
    view = render(
      <MemoryRouter>
        <UserContext.Provider value={{ apiCall: apiCall, user: mockNotAuthenticatedUser }}>
          <SignupForm history={mockHistory} />
        </UserContext.Provider>
      </MemoryRouter>
    )
  })
  it("should display an error when phone not populated", async () => {
    const button = view.container.querySelector("button")
    await wait(() => fireEvent.click(button))
    expect(await screen.findByText("*Phone number is required")).toBeVisible()

  })

  it("should display an error when passwords don't match", async () => {
    const button = view.container.querySelector("button")
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), mockInputEvent)
    await wait(() => fireEvent.click(button))
    expect(await screen.findByText("*Passwords must match")).toBeVisible()
  })

  it("should succeed when all fields are valid", async () => {
    const button = view.getByText("SIGN UP")
    fireEvent.change(screen.getByPlaceholderText("First Name"), mockInputEvent)
    fireEvent.change(screen.getByPlaceholderText("Last Name"), mockInputEvent)
    fireEvent.change(screen.getByPlaceholderText("Email"), mockInputEmailEvent)
    fireEvent.change(screen.getByPlaceholderText("Phone"), mockInputEvent)
    fireEvent.change(screen.getByPlaceholderText("Password"), mockPassword)
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), mockPassword)

    await wait(() => fireEvent.click(button))

    expect(apiCall).toHaveBeenCalledWith("post", "/users", {
      user: {
        confirmPassword: "Mock1Password",
        email: "mock@mockdomain.com",
        firstName: "mock value",
        lastName: "mock value",
        password: "Mock1Password",
        phone: "mock value"
      }
    }, {
      success: "Account Created Successfully!"
    })

    expect(screen.getByText("Return to Login")).toBeVisible()

  })

})
