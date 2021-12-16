json.extract! tenant, :id, :firstName, :lastName, :fullName, :phone, :lease, :archived, :created_at, :updated_at
json.propertyName tenant.property ? tenant.property.name : nil
json.propertyManagerNames tenant.property_managers.map(&:full_name)
