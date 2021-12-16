class CreateProperties < ActiveRecord::Migration[6.1]
  def change
    create_table :properties do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :address, null: false
      t.integer :num_units, default: 1
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.boolean :archived, null: false, default: false

      t.timestamps
    end
  end
end
