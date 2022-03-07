FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    firstName { Faker::Name.first_name }
    lastName { Faker::Name.last_name }
    password { 'asdfasdf' }

    factory :admin, class: 'Admin' do
      type { 'Admin' }
    end

    factory :staff, class: 'Staff' do
      type { 'Staff' }
    end

    factory :property_manager, class: 'PropertyManager' do
      type { 'PropertyManager' }
    end

    factory :unauthorized_user, class: 'UnauthorizedUser' do
      # Default type is unauthorized
    end
  end
end
