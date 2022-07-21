class UsersController < ApplicationController
  before_action :find_user, except: [:staff_members, :update_role]
  after_action :verify_authorized

  def show
    authorize @user, policy_class: UserPolicy
  end

  def update
    authorize @user, policy_class: UserPolicy
    @user.update(user_params)
    render :show
  end

  def update_role
    authorize User
    User.where(id: params[:user_id]).find_each { |user| user.update(type: params[:type]) }
    head :no_content
  end

  def staff_members
    authorize User
    @staffs = Staff.all
    @admins = Admin.all
  end

  private

  def find_user
    @user = policy_scope(User).find(params[:id])
  end

  def user_params
    params.permit(:type, :firstName, :lastName, :phone, :email)
  end
end
