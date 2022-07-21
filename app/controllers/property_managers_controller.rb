class PropertyManagersController < ApplicationController
  after_action :verify_policy_scoped

  def index
    @property_managers = policy_scope(PropertyManager.includes(:properties))
  end
end
