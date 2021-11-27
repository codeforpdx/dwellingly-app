class PropertyManagersController < ApplicationController
  def index
    @property_managers = PropertyManager.includes(:properties)
  end
end
