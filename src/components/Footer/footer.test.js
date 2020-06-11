import React from "react";
import { shallow } from "enzyme";
import Footer from "./index";

const setUp = (props = {}) => {
	const component = shallow(<Footer />);
	return component;
};

describe("Footer Component", () => {
	it("should render without errors", () => {
		const component = setUp();
		const wrapper = component.find("footer");
		expect(wrapper.length).toBe(1);
	});
});
