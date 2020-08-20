import React from "react";
import { shallow } from "enzyme";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";
import { MenuLink, NavMenu } from "./navigationMenu";
import UserContext from "../../UserContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/manage/managers" }),
  useParams: jest.fn(),
}));

const mockUser = {
  isAuthenticated: true,
  firstName: "MockFirst",
  lastName: "MockLast",
};

const setUp = (Comp, props = {}) => {
  const component = shallow(<Comp {...props} />);
  return component;
};

describe("MenuLink Component", () => {
  it("should render without errors", () => {
    setUp(MenuLink, { name: "Home", href: "/" });
  });

  it("should contain a Link component", () => {
    const component = setUp(MenuLink, { name: "Home", href: "/" });
    const wrapper = component.find("Link");
    expect(wrapper.length).toBe(1);
  });

  it('should use the class "has-text-black" when the href prop matches the path in useLocation()', () => {
    const component = setUp(MenuLink, {
      name: "Manage Managers",
      href: "/manage/managers",
    });
    const wrapper = component.find("Link");
    expect(wrapper.hasClass("has-text-black")).toBeTruthy();
  });
});

describe("NavMenu Component", () => {

  let view;
  beforeEach(() => {
    view = render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: mockUser }}>
          <NavMenu />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  it('should include more than 10 links', () => {
    const links = view.container.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(10);
  });

  it("should render a link with user name concatenated", () => {
    screen.findByText("MockFirst MockLast");
  });
});
