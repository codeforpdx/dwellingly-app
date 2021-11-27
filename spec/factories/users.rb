FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    firstName { Faker::Name.first_name }
    lastName { Faker::Name.last_name }
    password { 'asdfasdf' }

    factory :admin do
      type { 'Admin' }
    end

    factory :staff do
      type { 'Staff' }
    end

    factory :property_manager do
      type { 'PropertyManager' }
    end

    factory :unauthorized_user do
      # Default type is unauthorized
    end
  end
end
