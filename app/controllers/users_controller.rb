class UsersController < ApplicationController
  before_action :find_user, except: [:staff_members, :authorize]

  def show
  end

  def update
    @user.update(user_params)
    render :show
  end

  def authorize
    User.where(id: params[:user_id]).find_each { |user| user.update(type: params[:type]) }
    head :no_content
  end

  def staff_members
    @staffs = User.where(type: 'Staff')
    @admins = User.where(type: 'Admin')
  end

  private

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:type, :firstName, :lastName, :phone, :email)
  end
end
