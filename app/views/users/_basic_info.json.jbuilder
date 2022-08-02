json.extract!(
  user,
  :id,
  :firstName,
  :lastName,
  :phone,
  :email,
  :archived,
  :type,
  :lastActive,
  :created_at,
  :updated_at
)
json.admin user.admin?
json.staff user.staff?
json.staff_level user.staff_level?
json.property_manager user.property_manager?
