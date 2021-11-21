class InvitationsController < Devise::InvitationsController
  def create
    self.resource = invite_resource

    yield resource if block_given?

    if resource.errors.empty?
      render json: resource, status: :created
    else
      render json: resource.errors, status: :unprocessable_entity
    end
  end

  protected

  def after_invite_path_for(_resource)
    root_path
  end

  def invite_params
    params.require(:invitation).permit(shared_params + resource_params)
  end

  def shared_params
    [:firstName, :lastName, :phone, :email, :type, :role]
  end

  def resource_params
    case resource_class.new
    when PropertyManager
      [{ property_ids: [] }]
    else
      []
    end
  end

  # Overwrite Devise::Invitations resource_class method
  def resource_class
    params.dig(:invitation, :type).constantize
  end
end
