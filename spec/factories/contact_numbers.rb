FactoryBot.define do
  factory :contact_number do
    number { Faker::PhoneNumber.cell_phone }
    emergency_contact
  end
end
