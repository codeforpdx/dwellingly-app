json.joinStaff do
  json.array! @staffs, partial: 'user', as: :user
end
json.admins do
  json.array! @admins, partial: 'user', as: :user
end
