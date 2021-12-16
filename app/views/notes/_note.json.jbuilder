json.extract! note, :id, :text, :user_id, :ticket_id, :created_at, :updated_at
json.user note.user.full_name
