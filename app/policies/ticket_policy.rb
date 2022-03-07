class TicketPolicy < ApplicationPolicy
  def destroy?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def bulk_delete?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  class Scope
    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      user.tenants.tickets
    end

    private

    attr_reader :user, :scope
  end
end
