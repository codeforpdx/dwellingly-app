FactoryBot.define do
  factory :ticket do
    tenant
    association :author, factory: :user
    status { ['New', 'In Progress', 'Closed'].sample }
  end
end
