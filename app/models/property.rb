class Property < ApplicationRecord
  # TODO: We do not destroy properties. They are archived...
  # Evaluate what happens to Tenants/Leases/property_managers when archived.
  validates :name, uniqueness: { case_sensitive: false } 

  has_many :leases, dependent: :destroy
  has_many :tenants, through: :leases
  has_many :properties_property_managers, dependent: :destroy
  has_many :property_managers, through: :properties_property_managers
end
