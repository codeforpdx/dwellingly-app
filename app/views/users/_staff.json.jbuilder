json.extract! user, :id, :firstName, :lastName, :phone, :email, :role, :type
json.admin user.admin?
json.tenants do
  json.array! user.tenants, partial: "tenants/tenant", as: :tenant
end
