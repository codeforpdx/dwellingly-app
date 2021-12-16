class CreateLeases < ActiveRecord::Migration[6.1]
  def change
    create_table :leases do |t|
      t.references :property, null: false, foreign_key: true
      t.references :tenant, null: false, foreign_key: true
      t.integer :occupants
      t.datetime :dateTimeStart, null: false
      t.datetime :dateTimeEnd, null: false
      t.string :unitNum

      t.timestamps
    end
  end
end
