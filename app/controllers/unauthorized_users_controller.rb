class UnauthorizedUsersController < ApplicationController
  def index
    @unauthorized_users = UnauthorizedUser.active
  end

  def destroy
    UnauthorizedUser.find(params[:id]).destroy
    head :no_content
  end
end
