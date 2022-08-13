import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom"
import UserContext from "components/src/contexts/UserContext"
import Footer from "components/src/views/Footer/index"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/dashboard"
  })
}))

describe("Footer Component", () => {
  beforeEach( () => {
    render(
      <MemoryRouter initialEntries={["/manage/managers"]}>
        <UserContext.Provider value={{user: { isAuthenticated: true }}}>
          <Footer />
        </UserContext.Provider>
      </MemoryRouter>
    )
  })

  it("should render without errors", () => {
    expect(screen.getByTestId("footer-text")).toBeVisible()
  })
})
