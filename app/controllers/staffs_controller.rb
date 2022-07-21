class StaffsController < ApplicationController
  after_action :verify_authorized

  def index
    @staff = authorize Staff.all
  end
end
