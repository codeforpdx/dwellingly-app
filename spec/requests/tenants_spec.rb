require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/api/tenants", type: :request do
  # Tenant. As you add validations to Tenant, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) do
    skip("Add a hash of attributes valid for your model")
  end

  let(:invalid_attributes) do
    skip("Add a hash of attributes invalid for your model")
  end

  describe "GET /index" do
    it "renders a successful response" do
      Tenant.create! valid_attributes
      get tenants_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      tenant = Tenant.create! valid_attributes
      get api_tenant_url(tenant)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    skip "renders a successful response" do
      get new_tenant_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      tenant = Tenant.create! valid_attributes
      get edit_api_tenant_url(tenant)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Tenant" do
        expect do
          post tenants_url, params: { tenant: valid_attributes }
        end.to change(Tenant, :count).by(1)
      end
    end

    context "with invalid parameters" do
      it "does not create a new Tenant" do
        expect do
          post tenants_url, params: { tenant: invalid_attributes }
        end.to change(Tenant, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post tenants_url, params: { tenant: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) do
        skip("Add a hash of attributes valid for your model")
      end

      it "updates the requested tenant" do
        tenant = Tenant.create! valid_attributes
        patch api_tenant_url(tenant), params: { tenant: new_attributes }
        tenant.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the tenant" do
        tenant = Tenant.create! valid_attributes
        patch api_tenant_url(tenant), params: { tenant: new_attributes }
        tenant.reload
        expect(response).to redirect_to(api_tenant_url(tenant))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        tenant = Tenant.create! valid_attributes
        patch api_tenant_url(tenant), params: { tenant: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested tenant" do
      tenant = Tenant.create! valid_attributes
      expect do
        delete api_tenant_url(tenant)
      end.to change(Tenant, :count).by(-1)
    end

    it "redirects to the api_tenants list" do
      tenant = Tenant.create! valid_attributes
      delete api_tenant_url(tenant)
      expect(response).to redirect_to(tenants_url)
    end
  end
end
