import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import "@testing-library/jest-dom/extend-expect";
import Tenant from "../index";

const mockTenant = {
  id: 42,
  firstName: "Mock first",
  lastName: "Mock last",
  phone: "Mock phone",
  propertyID: 69,
  propertyName: "mock1",
  staff: [],
  archived: false
};

const mockProperty = {
  id: 1,
  address: "Mock address",
  city: "City",
  state: "State",
  zipcode: "Zip",
};

const server = setupServer(
  rest.get("/api/tenants/42", (req, res, ctx) => res(ctx.json(mockTenant))),
  rest.get("/api/properties/mock1", (req, res, ctx) => res(ctx.json(mockProperty))),
  rest.get("/api/tickets?tenant_id=42", (req, res, ctx) => res(ctx.json({}))),
  rest.post("/api/users/role", (req, res, ctx) => res(ctx.json([]))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Tenant Component", () => {
  let view;
  beforeEach(() => {
    view = render(
      <MemoryRouter initialEntries={["manage/tenant/42"]}>
        <Route path="manage/tenant/:id">
          <Tenant />
        </Route>
      </MemoryRouter>,
    );
  });

  it.skip("should call api so it renders a tenant first name", async () => {
    await view.findByText("Mock first");
  });

  it.skip("should call api so it renders a concatenated property address", async () => {
    await screen.findByText("Mock address, City, State, Zip");
  });
});
