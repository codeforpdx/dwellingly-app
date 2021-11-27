json.extract! property, :id, :name, :address, :num_units, :city, :state, :zipcode, :leases, :archived, :created_at,
              :updated_at
json.propertyManagers property.property_managers
json.tenants property.tenants, :id, :fullName, :lease, :phone
