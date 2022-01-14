require 'rails_helper'

RSpec.describe Property, type: :model do
  describe 'Factories' do
    subject { create(:property) }

    it { is_expected.to be_truthy }
  end

  describe 'Unique name' do
    subject { create(:property) }

    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end
end
