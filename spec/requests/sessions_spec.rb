require 'rails_helper'

RSpec.describe "/api/resource", type: :request do
  describe "POST /sign_in" do
    it "updates the user's lastActive timestamp on sign in" do
      property_manager = create(:property_manager)
      expect(property_manager.lastActive).to be_nil

      post user_session_url, params: { email: property_manager.email, password: property_manager.password }
      expect(JSON.parse(response.body)["lastActive"]).not_to be_nil
    end
  end
end
