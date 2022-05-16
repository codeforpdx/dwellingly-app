import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { act } from "react-dom/test-utils"
import { render, fireEvent, screen } from "@testing-library/react"
import EditPropertyManager from "components/src/views/EditPropertyManager/index"
import UserContext from "components/src/contexts/UserContext"

jest.mock("react-router", () => ({
  useParams: jest.fn().mockReturnValue({ id: "123" }),
}))

describe("Edit Property Manager Component", () => {
  const managerData = {
    email: "user1@dwellingly.org",
    phone: "1234567890",
    password: "1234",
    firstName: "user1",
    lastName: "tester",
    archived: "false",
    role: "admin",
    properties: [],
    tenants: []
  }

  let apiRequest = jest.fn().mockReturnValue(Promise.resolve({ data: managerData }))

  beforeEach(async () => {
    await act(async () => {
      render(
        <UserContext.Provider value={{apiCall: apiRequest}}>
          <EditPropertyManager />
        </UserContext.Provider>
      )
    })
  })

  it("Renders without errors", () => {
    expect(screen).not.toBeNull()
    expect(
      screen.getByText(`${managerData.firstName} ${managerData.lastName}`)
    ).not.toBeNull()
  })

  it("Show form when pen icon is clicked", async () => {
    fireEvent.click(screen.getByRole("button"))
    await expect(screen.getAllByRole("textbox")).toHaveLength(4)
  })
})
