class StaffTenantConnection < ApplicationRecord
  belongs_to :tenant
  belongs_to :staff
end
