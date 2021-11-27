class CreateTenants < ActiveRecord::Migration[6.1]
  def change
    create_table :tenants do |t|
      t.string :firstName, null: false
      t.string :lastName, null: false
      t.string :phone, null: false
      t.boolean :archived, null: false, default: false

      t.timestamps
    end
  end
end
