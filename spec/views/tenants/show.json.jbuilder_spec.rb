require 'rails_helper'

RSpec.describe "tenants/show", type: :view do
  before do
    @tenant = assign(:tenant, Tenant.create!(
                                firstName: "First Name",
                                lastName: "Last Name",
                                phone: "Phone",
                                archived: false
                              ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/First Name/)
    expect(rendered).to match(/Last Name/)
    expect(rendered).to match(/Phone/)
    expect(rendered).to match(/false/)
  end
end
