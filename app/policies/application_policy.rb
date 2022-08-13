# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def show?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def create?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def new?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def update?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def edit?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  def destroy?
    raise Pundit::NotAuthorizedError if not_authorized?

    admin?
  end

  private

  def not_authorized?
    user.nil? || user.unauthorized_user?
  end

  def admin?
    user.admin?
  end

  def staff?
    user.staff?
  end

  class Scope
    def initialize(user, scope)
      raise Pundit::NotAuthorizedError if user.nil? || user.unauthorized_user?

      @user = user
      @scope = scope
    end

    def resolve
      raise NotImplementedError, "You must define #resolve in #{self.class}"
    end

    private

    attr_reader :user, :scope
  end
end
