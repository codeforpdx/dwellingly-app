class Tenant < ApplicationRecord
  # TODO: What happens to a lease/staff_relationship/tickets when archived
  has_one :lease, dependent: :destroy
  has_one :property, through: :lease
  has_many :property_managers, through: :property
  has_many :staff_tenant_connections, dependent: :destroy
  has_many :staff, through: :staff_tenant_connections
  has_many :tickets, dependent: :destroy

  scope :active, -> { where(archived: false) }
  scope :housed, -> { joins(:lease) }
  scope :unstaffed, -> { left_joins(:staff_tenant_connections).where(staff_tenant_connections: { staff_id: nil }) }
  scope :tickets, -> { Ticket.where(tenant_id: select(:id)) }

  accepts_nested_attributes_for :lease

  # Legacy support

  def fullName
    "#{firstName} #{lastName}"
  end
end
