require 'rails_helper'

RSpec.describe Property, type: :model do
  describe 'Factories' do
    subject { create(:property) }

    it { is_expected.to be_truthy }
  end
end
