json.extract! user, :id, :firstName, :lastName, :phone, :email, :role, :type
json.admin user.admin?
