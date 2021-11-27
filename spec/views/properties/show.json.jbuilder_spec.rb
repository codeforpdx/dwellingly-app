require 'rails_helper'

RSpec.describe "properties/show", type: :view do
  before do
    @property = assign(:property, Property.create!(
                                    name: "Name",
                                    address: "Address",
                                    num_units: 2,
                                    city: "City",
                                    state: "State",
                                    zipcode: "Zipcode",
                                    archived: false
                                  ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Address/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/City/)
    expect(rendered).to match(/State/)
    expect(rendered).to match(/Zipcode/)
    expect(rendered).to match(/false/)
  end
end
