require './spec/fixtures/files/seed_helper'

puts "Seeding database ..."

Admin.create(SeedHelper.user_attributes(email: 'admin@dwellingly.org'))

properties = 45.times.with_index.map do |index|
  Property.create(
    name: SeedHelper.property_names[index],
    address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zipcode: Faker::Address.zip_code
  )
end

properties.sample(5).each { |property| property.update_column(:archived, true) }
properties.sample(30).each { |property| property.update_column(:num_units, rand(100)) }

property_managers = 40.times.map do
  PropertyManager.create(
    SeedHelper.user_attributes.merge(
      properties: properties.sample(rand(3))
    )
  )
end

property_managers.sample(5).each { |pm| pm.update_column(:archived, true) }

8.times { UnauthorizedUser.create(SeedHelper.user_attributes) }

30.times { Staff.create(SeedHelper.user_attributes) }

8.times { Staff.create(SeedHelper.user_attributes(archived: true)) }

tenants = 250.times.map { Tenant.create(SeedHelper.tenant_attributes) }

105.times { Tenant.create(SeedHelper.tenant_attributes(archived: true)) }

tenants.sample(200).each do |tenant|
  Lease.create(
    property_id: properties.sample.id,
    tenant_id: tenant.id,
    occupants: rand(5),
    dateTimeStart: rand(360).days.ago,
    dateTimeEnd: rand(360).days.from_now,
    unitNum: rand(100)
  )
end

def approved_users
  @approved_users ||= Admin.all + Staff.all + PropertyManager.all
end

tickets = 800.times.map do
  Ticket.create(
    issue: Faker::Lorem.sentence,
    tenant_id: Tenant.housed.sample.id,
    author_id: approved_users.sample.id,
    status: ['New', 'In Progress', 'Closed'].sample,
    urgency: ['High', 'Low', 'Medium'].sample
  )
end

800.times { Note.create(text: Faker::Lorem.sentence, user_id: approved_users.sample, ticket_id: tickets.sample) }

3.times do
  EmergencyContact.create(
    name: Faker::Company.name,
    description: Faker::Lorem.sentence,
    contact_numbers_attributes: [{ number: Faker::PhoneNumber.phone_number }]
  )
end
