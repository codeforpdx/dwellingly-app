import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitForElement, screen, wait } from '@testing-library/react';
import { MemoryRouter, Route } from "react-router";
import Manager from "../index";
import axios from 'axios'
import UserContext from "../../../contexts/UserContext"

jest.mock('axios')

describe("Manager Component", () => {

  let managerData = {
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

  beforeEach(async () => {
    axios.get.mockImplementation(() => {
      return Promise.resolve({data: managerData})
      })


    await wait(() => {
      render(
      <MemoryRouter initialEntries={["manage/managers/1"]}>
        <Route path="manage/managers/:id">
          <UserContext.Provider value={{user: {accessJwt: "mockToken"}}}>
            <Manager />
          </UserContext.Provider>
        </Route>
      </MemoryRouter>)
    })

  });

  it("Renders without errors", () => {
    expect(screen).not.toBeNull();
    expect(
      screen.getByText(`${managerData.firstName} ${managerData.lastName}`)
    ).not.toBeNull()
  });

  it("Show form when pen icon is clicked", async () => {
    fireEvent.click(screen.getByRole("button"));
    await expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("Should update contact info when Formik field is edited", async () => {    
    axios.patch.mockImplementation((url, payload) => {
      return Promise.resolve({data: payload})
    })
    const updatedName = "Frank"

    fireEvent.click(screen.getByRole("button"));
    const firstNameInput = await waitForElement(
      () => screen.getByDisplayValue(managerData.firstName)
    );
    const submitButton = await waitForElement(
      () => screen.getByText('SAVE')
    );
    fireEvent.change(firstNameInput, {
      target: {
        value: updatedName
      }
    });
    
    fireEvent.click(submitButton);

    const firstNameOutput = await waitForElement(
      () => screen.getByText(updatedName)
    )
    expect(firstNameOutput).toBeInTheDocument()
   
  });
  // TESTS TODO
  // IT GETS MANAGER DATA?
  // IT SAVES MANAGER DATA?
});
