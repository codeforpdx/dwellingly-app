class EmergencyContact < ApplicationRecord
  has_many :contact_numbers, dependent: :destroy

  accepts_nested_attributes_for :contact_numbers
end
