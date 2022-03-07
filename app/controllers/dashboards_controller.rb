class DashboardsController < ApplicationController
  after_action :verify_authorized

  def show
    @dashboard = authorize Dashboard.new
  end
end
