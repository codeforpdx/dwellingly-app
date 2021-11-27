FactoryBot.define do
  factory :tenant do
    firstName { Faker::Name.first_name }
    lastName { Faker::Name.last_name }
    phone { Faker::PhoneNumber.cell_phone }
  end
end
