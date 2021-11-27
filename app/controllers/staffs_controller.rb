class StaffsController < ApplicationController
  def index
    @staff = Staff.all
  end
end
