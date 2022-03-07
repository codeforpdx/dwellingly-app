class TenantPolicy < ApplicationPolicy
  def create?
    raise Pundit::NotAuthorizedError if not_authorized?

    user.staff_level?
  end

  def update?
    raise Pundit::NotAuthorizedError if not_authorized?

    user.staff_level?
  end

  def destroy?
    raise Pundit::NotAuthorizedError if not_authorized?

    user.staff_level?
  end

  class Scope
    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      user.tenants
    end

    private

    attr_reader :user, :scope
  end
end
