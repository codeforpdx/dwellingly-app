require 'rails_helper'

RSpec.describe Admin, type: :model do
  describe 'Factories' do
    subject { create(:staff) }

    it { is_expected.to be_truthy }
  end
end
