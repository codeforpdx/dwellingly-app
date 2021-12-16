FactoryBot.define do
  factory :property do
    sequence(:name) { |index| SeedHelper.property_names[index] }
    address { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    zipcode { Faker::Address.zip_code }
  end
end
