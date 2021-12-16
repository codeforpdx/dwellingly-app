require 'rails_helper'

RSpec.describe Ticket, type: :model do
  describe 'Factories' do
    subject { create(:ticket) }

    it { is_expected.to be_truthy }
  end
end
