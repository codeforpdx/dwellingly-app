import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import { MemoryRouter } from "react-router";
import Manager from "./index";

describe("Manager Component", () => {

  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <MemoryRouter initialEntries={["manage/manager/1"]}>
        <Manager parms={{id: 1}}/>
      </MemoryRouter>
    );
  });
  it("Renders without errors", () => {
    expect(wrapper).not.toBeNull();
  });
  it("Show form when pen icon is clicked", () => {
    fireEvent.click(wrapper.getByRole("button"));
    expect(wrapper.getAllByRole("textbox")).toHaveLength(4);
  });
  it("Should update contact info when Formik field is edited", async () => {    
    fireEvent.click(wrapper.getByRole("button"));
    const firstNameInput = await waitForElement(() => wrapper.getByDisplayValue('Jim'));
    const submitButton = await waitForElement(() => wrapper.getAllByRole('button')[0]);
    fireEvent.change(firstNameInput, {
      target: {
        value: "Frank"
      }
    });
    
    fireEvent.click(submitButton);

    wait(() => {
      expect(wrapper.getByDisplayValue("Frank Oliver")).toHaveLength(1);
    });
  });
  // TESTS TODO
  // IT GETS MANAGER DATA?
  // IT SAVES MANAGER DATA?
});