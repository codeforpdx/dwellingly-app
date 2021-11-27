require 'rails_helper'

RSpec.describe UnauthorizedUser, type: :model do
  describe 'Factories' do
    subject { create(:unauthorized_user) }

    it { is_expected.to be_truthy }
  end
end
