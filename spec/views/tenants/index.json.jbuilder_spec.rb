require 'rails_helper'

RSpec.describe "tenants/index", type: :view do
  subject { JSON(render).first.deep_symbolize_keys }

  let(:tenant) { create(:tenant) }

  before { assign(:tenants, [tenant]) }

  it {
    is_expected.to match(
      id: tenant.id,
      firstName: tenant.firstName,
      lastName: tenant.lastName,
      fullName: tenant.fullName,
      phone: tenant.phone,
      staff: [],
      lease: tenant.lease,
      archived: tenant.archived,
      updated_at: JSON(tenant.updated_at.to_json),
      created_at: JSON(tenant.created_at.to_json)
    )
  }
end
