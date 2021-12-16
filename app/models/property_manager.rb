class PropertyManager < User
  # TODO: We archive property_managers. When archived what should happen to their assigned properties?
  has_many :properties_property_managers, dependent: :destroy
  has_many :properties, through: :properties_property_managers
  has_many :tenants, through: :properties
  has_one :default_property_assignment, class_name: 'PropertiesPropertyManager', dependent: :destroy
  has_one :default_property, through: :default_property_assignment, source: :property

  def date
    return 'Today' if created_at.today?

    created_at.to_date == 1.day.ago.to_date ? 'Yesterday' : 'This Week'
  end
end
