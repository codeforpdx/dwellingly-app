require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  subject(:policy) { described_class.new(user, other_user) }

  let(:user)       { build(:admin) }
  let(:other_user) { build(:user) }

  it { is_expected.to permit_actions(all_actions) }

  context 'when Staff' do
    let(:user) { build(:staff) }

    it { is_expected.to forbid_actions(super + [:update_role]) }

    context 'when current user is accessing their own record' do
      let(:other_user) { user }

      it { is_expected.to permit_actions([:show, :update]) }
      it { is_expected.to forbid_actions([:index, :create, :destroy]) }
    end
  end

  context 'when Property Manager' do
    let(:user) { build(:property_manager) }

    it { is_expected.to forbid_actions(all_actions) }

    context 'when current user is accessing their own record' do
      let(:other_user) { user }

      it { is_expected.to permit_actions([:show, :update]) }
      it { is_expected.to forbid_actions([:index, :create, :destroy]) }
    end
  end

  context 'when Unauthorized user' do
    let(:user) { build(:unauthorized_user) }

    [:index, :show, :create, :update, :destroy, :update_role, :staff_members].each do |action|
      it "rejects request for #{action}" do
        expect { policy.public_send("#{action}?") }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end

  context 'when no user' do
    let(:user) { nil }

    [:index, :show, :create, :update, :destroy, :update_role, :staff_members].each do |action|
      it "rejects request for #{action}" do
        expect { policy.public_send("#{action}?") }.to raise_error(Pundit::NotAuthorizedError)
      end
    end
  end

  def all_actions
    super + [:update_role, :staff_members]
  end
end
