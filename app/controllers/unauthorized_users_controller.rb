class UnauthorizedUsersController < ApplicationController
  after_action :verify_authorized

  def index
    @unauthorized_users = authorize UnauthorizedUser.active
  end

  def destroy
    authorize(UnauthorizedUser).find(params[:id]).destroy
    head :no_content
  end
end
