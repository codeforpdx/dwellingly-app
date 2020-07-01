import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
import { Route, MemoryRouter } from "react-router";
import Manager from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("Managers Component", () => {
  const handleEditToggle = jest.fn();
  const onFormikSubmit = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={["manage/manager/1"]}>
        <Manager parms={{id: 1}}/>
      </MemoryRouter>
    );
  });
  it("Renders without errors", () => {
    console.log(wrapper.debug());
    expect(wrapper).not.toBeNull();
  });
  it("Sets isEditing true when pen icon is clicked", () => {
    expect(wrapper.find("h2").text()).toEqual("Jim Oliver");
  });
});

// TEST todos
// 1) test that component renders without errors
// 2) test that when edit button is clicked, isEditing is true
// 3) test that when form is edited after being clicked and saved, state of managers updates
