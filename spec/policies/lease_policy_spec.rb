require 'rails_helper'

RSpec.describe LeasePolicy, type: :policy do
  subject(:policy) { described_class.new(user, lease) }

  let(:user)  { build(:admin) }
  let(:lease) { build(:lease) }

  it { is_expected.to permit_actions(all_actions) }

  context 'when Staff' do
    let(:user) { build(:staff) }

    it { is_expected.to forbid_actions(all_actions) }
  end

  context 'when Property Manager' do
    let(:user) { build(:property_manager) }

    it { is_expected.to forbid_actions(all_actions) }
  end

  context 'when Unauthorized user' do
    let(:user) { build(:unauthorized_user) }

    [:index, :show, :create, :update, :destroy].each do |action|
      it "rejects request for #{action}" do
        expect { policy.public_send("#{action}?") }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end

  context 'when no user' do
    let(:user) { nil }

    [:index, :show, :create, :update, :destroy].each do |action|
      it "rejects request for #{action}" do
        expect { policy.public_send("#{action}?") }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end
end
