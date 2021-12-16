FactoryBot.define do
  factory :lease do
    property
    tenant
    dateTimeStart { 0.days.ago }
    dateTimeEnd { 1.year.from_now }
  end
end
