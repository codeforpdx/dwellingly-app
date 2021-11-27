FactoryBot.define do
  factory :emergency_contact do
    name { [Faker::DcComics.hero, Faker::DcComics.heroine].sample }
  end
end
