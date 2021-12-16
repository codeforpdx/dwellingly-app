class Lease < ApplicationRecord
  belongs_to :property
  belongs_to :tenant

  # Legacy mapping
  def propertyID
    property_id
  end

  def tenantID
    tenant_id
  end

  def propertyID=(value)
    self.property_id = value
  end

  def tenantID=(value)
    self.tenant_id = value
  end
end
