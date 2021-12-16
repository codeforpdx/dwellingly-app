class CreatePropertiesPropertyManagers < ActiveRecord::Migration[6.1]
  def change
    create_table :properties_property_managers do |t|
      t.references :property, null: false, foreign_key: true
      t.references :property_manager, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
