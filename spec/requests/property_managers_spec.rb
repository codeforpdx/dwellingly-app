require 'rails_helper'

RSpec.describe "PropertyManagers", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/property_managers/index"
      expect(response).to have_http_status(:success)
    end
  end
end
