json.extract! user, :id, :firstName, :lastName, :phone, :email
json.properties user.properties
json.tenants do
  json.array! user.tenants, partial: "tenants/tenant", as: :tenant
end
