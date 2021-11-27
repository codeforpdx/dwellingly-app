json.extract! tenant, :id, :firstName, :lastName, :fullName, :phone, :lease, :archived, :created_at, :updated_at
json.staff tenant.staff, :id, :firstName, :lastName
json.propertyName tenant.lease.property.name if tenant.lease
