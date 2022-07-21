class Admin < User
  def tenants
    Tenant.all
  end
end
