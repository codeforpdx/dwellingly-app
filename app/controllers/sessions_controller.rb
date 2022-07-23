# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # Redirects here when user has an archived or un-approved account.
  # flash[:alert] message is set in the User#inactive_message
  def new
    invalid_login_attempt
  end

  # POST /resource/sign_in
  def create
    resource = User.find_for_database_authentication(email: params[:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:password])
      sign_in :user, resource
      resource.update!(lastActive: Time.current)
      return render json: resource.to_json
    end

    invalid_login_attempt
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  def cypress_sign_in
    user = User.find_by(email: params[:email])
    if user.present?
      sign_in(user)
      render json: { success: true }
    else
      render json: { shopId: false }
    end
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def invalid_login_attempt
    error_message = flash[:alert].presence || t('devise.sessions.user.invalid')
    render json: { error: error_message }, status: :unauthorized
  end
end
