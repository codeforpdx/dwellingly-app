require 'rails_helper'

RSpec.describe "api/properties/index", type: :view do
  before do
    assign(:properties, [
             Property.create!(
               name: "Name",
               address: "Address",
               num_units: 2,
               city: "City",
               state: "State",
               zipcode: "Zipcode",
               archived: false
             ),
             Property.create!(
               name: "Name",
               address: "Address",
               num_units: 2,
               city: "City",
               state: "State",
               zipcode: "Zipcode",
               archived: false
             )
           ])
  end

  skip "renders a list of properties" do
    render
    assert_select "tr>td", text: "Name".to_s, count: 2
    assert_select "tr>td", text: "Address".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: "City".to_s, count: 2
    assert_select "tr>td", text: "State".to_s, count: 2
    assert_select "tr>td", text: "Zipcode".to_s, count: 2
    assert_select "tr>td", text: false.to_s, count: 2
  end
end
