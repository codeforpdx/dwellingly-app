class InvitationsController < Devise::InvitationsController
  before_action :authorize_user, except: [:edit, :update] # rubocop:disable Rails/LexicallyScopedActionFilter

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

  def authorize_user
    authorize User, policy_class: ApplicationPolicy # Admins only
  end

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

  # Overwrite Devise::Invitations resource_class method so that we can create the correct UserType.
  # Alternatively we could update our routes so that we have a different route for each type of
  # user. This will also require frontend updates to use the new routes, rather than sending
  # the type parameter in the payload.
  def resource_class
    return params.dig(:invitation, :type).constantize if params.dig(:invitation, :type).present?

    super
  end

  # This method is called to validate the token. It redirects on an invalid or blank token.
  # rubocop:disable Layout/MultilineOperationIndentation
  # rubocop:disable Lint/AssignmentInCondition
  # rubocop:disable Rails/DynamicFindBy
  def resource_from_invitation_token
    unless params[:invitation_token] &&
      self.resource = resource_class.find_by_invitation_token(params[:invitation_token], true)

      redirect_to root_path(error: :invalid_invitation_token)
    end
  end
  # rubocop:enable Layout/MultilineOperationIndentation
  # rubocop:enable Lint/AssignmentInCondition
  # rubocop:enable Rails/DynamicFindBy
end
