import React from "react";
import axios from "axios";
import { fireEvent, render, screen, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Settings from "./index";
import UserContext from "../../UserContext";

const mockHistory = createMemoryHistory()
jest.spyOn(axios, "get").mockResolvedValue({});

const mockNotAuthenticatedUser = {
  isAuthenticated: false,
  identity: 1,
};

describe("settings component", () => {
  let view = null;

  beforeEach(() => {
    view = render(
      <UserContext.Provider value={{ user: mockNotAuthenticatedUser }}>
        <Router history={mockHistory}>
          <Settings />
        </Router>
      </UserContext.Provider>
    );
  });

  it.only("should make an API call to get user info", async () => {
    expect(screen.queryByText("SAVE")).toBeNull();
    expect(await screen.findByText("SAVE")).toBeInTheDocument();
  });
});
