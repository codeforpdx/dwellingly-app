json.extract! ticket, :id, :issue, :tenant_id, :author_id, :status_p, :urgency, :created_at, :updated_at
json.assigned_staff ticket.tenant.staff
json.author ticket.author.full_name
json.minsPastUpdate Time.current.min - ticket.updated_at.min
json.notes do
  json.array! ticket.notes, partial: 'notes/note', as: :note
end
json.tenant ticket.tenant.fullName
# ah this is duped
json.status ticket.status_p
