json.tickets do
  json.new do
    json.total_count @dashboard.open.size
    json.latent_count @dashboard.latent_open.size
  end

  json.in_progress do
    json.total_count @dashboard.in_progress.size
    json.latent_count @dashboard.latent_in_progress.size
  end
end

json.managers @dashboard.managers do |manager|
  json.id manager.id
  json.date manager.date
  json.first_name manager.firstName
  json.last_name manager.lastName
  json.property_name manager.default_property&.name || 'Not Assigned'
end

json.pending_users do
  json.array! @dashboard.pending_users, partial: 'users/user', as: :user
end

json.tenants do
  json.array! @dashboard.tenants, partial: 'tenant', as: :tenant
end

json.staff do
  json.array! @dashboard.staff
end
