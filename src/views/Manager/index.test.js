import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Route, MemoryRouter } from "react-router-dom";
import Manager from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("Managers Component", () => {
  let handleEditToggle = jest.fn();
  let onFormikSubmit = jest.fn();

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Route path='manage/managers/1'>
          <Manager
            handleEditToggle={handleEditToggle}
            onFormikSubmit={onFormikSubmit}
          />
        </Route>
      </MemoryRouter>
    );
  });
  it("Renders without errors", () => {
    expect(wrapper).not.toBeNull();
  });
});

// TEST todos
// 1) test that component renders without errors
// 2) test that when edit button is clicked, isEditing is true
// 3) test that when form is edited after being clicked and saved, state of managers updates
