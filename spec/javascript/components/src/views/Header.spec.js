import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom"
import UserContext from "components/src/contexts/UserContext"
import Header from "components/src/views/Header/Header"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/dashboard"
  })
}))

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={["/manage/managers"]}>
      <UserContext.Provider value={{ logout: jest.fn(), user: { isAuthenticated: true } }}>
        <Header />
      </UserContext.Provider>
    </MemoryRouter>
  )
})

describe("Header Component", () => {
  it("should render without errors", () => {
    expect(screen.getByAltText("dwellingly logo")).toBeVisible()
  })

  it("should have a gradient background", () => {
    expect(screen.getByTestId("header")).toHaveClass("bg-gradient")
  })
})

describe("Logout Button", () => {
  it("should render LogOutButton", () => {
    expect(screen.getByText(/LOG OUT/i)).toBeVisible()
  })
})
