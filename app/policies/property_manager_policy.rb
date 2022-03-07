class PropertyManagerPolicy < ApplicationPolicy
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
