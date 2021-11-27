# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_29_131643) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contact_numbers", force: :cascade do |t|
    t.string "number", null: false
    t.string "numType"
    t.string "extension"
    t.bigint "emergency_contact_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["emergency_contact_id"], name: "index_contact_numbers_on_emergency_contact_id"
  end

  create_table "emergency_contacts", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_emergency_contacts_on_name", unique: true
  end

  create_table "leases", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.bigint "tenant_id", null: false
    t.integer "occupants"
    t.datetime "dateTimeStart", null: false
    t.datetime "dateTimeEnd", null: false
    t.string "unitNum"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_leases_on_property_id"
    t.index ["tenant_id"], name: "index_leases_on_tenant_id"
  end

  create_table "notes", force: :cascade do |t|
    t.string "text"
    t.bigint "user_id", null: false
    t.bigint "ticket_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["ticket_id"], name: "index_notes_on_ticket_id"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.integer "num_units", default: 1
    t.string "city", null: false
    t.string "state", null: false
    t.string "zipcode", null: false
    t.boolean "archived", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_properties_on_name", unique: true
  end

  create_table "properties_property_managers", force: :cascade do |t|
    t.bigint "property_id", null: false
    t.bigint "property_manager_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_properties_property_managers_on_property_id"
    t.index ["property_manager_id"], name: "index_properties_property_managers_on_property_manager_id"
  end

  create_table "staff_tenant_connections", force: :cascade do |t|
    t.bigint "staff_id", null: false
    t.bigint "tenant_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["staff_id"], name: "index_staff_tenant_connections_on_staff_id"
    t.index ["tenant_id"], name: "index_staff_tenant_connections_on_tenant_id"
  end

  create_table "tenants", force: :cascade do |t|
    t.string "firstName", null: false
    t.string "lastName", null: false
    t.string "phone", null: false
    t.boolean "archived", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tickets", force: :cascade do |t|
    t.string "issue"
    t.bigint "tenant_id", null: false
    t.bigint "author_id", null: false
    t.integer "status", null: false
    t.string "urgency"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_tickets_on_author_id"
    t.index ["status"], name: "index_tickets_on_status"
    t.index ["tenant_id"], name: "index_tickets_on_tenant_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "role"
    t.string "firstName", null: false
    t.string "lastName", null: false
    t.string "phone"
    t.boolean "archived", default: false, null: false
    t.datetime "lastActive"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "type", default: "UnauthorizedUser", null: false
    t.string "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer "invitation_limit"
    t.string "invited_by_type"
    t.bigint "invited_by_id"
    t.integer "invitations_count", default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id"
    t.index ["invited_by_type", "invited_by_id"], name: "index_users_on_invited_by"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["type"], name: "index_users_on_type"
  end

  add_foreign_key "contact_numbers", "emergency_contacts"
  add_foreign_key "leases", "properties"
  add_foreign_key "leases", "tenants"
  add_foreign_key "notes", "tickets"
  add_foreign_key "notes", "users"
  add_foreign_key "properties_property_managers", "properties"
  add_foreign_key "properties_property_managers", "users", column: "property_manager_id"
  add_foreign_key "staff_tenant_connections", "tenants"
  add_foreign_key "staff_tenant_connections", "users", column: "staff_id"
  add_foreign_key "tickets", "tenants"
  add_foreign_key "tickets", "users", column: "author_id"
end
