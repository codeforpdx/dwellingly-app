require 'rails_helper'

RSpec.describe "UnauthorizedUsers", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/unauthorized_users/index"
      expect(response).to have_http_status(:success)
    end
  end
end
