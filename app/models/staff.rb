class Staff < User
  # TODO: What happens to relationships when staff is archived?
  has_many :staff_tenant_connections, dependent: :destroy
  has_many :tenants, through: :staff_tenant_connections
end
