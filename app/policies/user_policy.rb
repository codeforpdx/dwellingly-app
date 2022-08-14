class UserPolicy < ApplicationPolicy
  def show?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin? || user == record
  end

  def update?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin? || user == record
  end

  def update_role?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def staff_members?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin? || staff?
  end

  class Scope
    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user.staff_level?
        scope.all
      else
        user.properties.property_managers
      end
    end

    private

    attr_reader :user, :scope
  end
end
