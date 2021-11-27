class CreateStaffTenants < ActiveRecord::Migration[6.1]
  def change
    create_table :staff_tenant_connections do |t|
      t.references :staff, null: false, foreign_key: { to_table: :users }
      t.references :tenant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
