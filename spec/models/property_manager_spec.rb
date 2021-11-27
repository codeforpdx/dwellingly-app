require 'rails_helper'

RSpec.describe PropertyManager, type: :model do
  describe 'Factories' do
    subject { create(:property_manager) }

    it { is_expected.to be_truthy }
  end
end
