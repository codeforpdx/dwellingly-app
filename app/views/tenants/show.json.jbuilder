json.partial! "tenants/tenant", tenant: @tenant
json.property do
  json.partial! "properties/property", property: @tenant.property if @tenant.property
end
json.tickets do
  json.array! @tenant.tickets, partial: "tickets/ticket", as: :ticket
end
