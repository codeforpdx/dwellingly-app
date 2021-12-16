json.extract! emergency_contact, :id, :name, :description, :created_at, :updated_at
json.contact_numbers do
  json.array! emergency_contact.contact_numbers, partial: "contact_numbers/contact_number", as: :contact_number
end
