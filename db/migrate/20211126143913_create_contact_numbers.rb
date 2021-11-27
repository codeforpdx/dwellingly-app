class CreateContactNumbers < ActiveRecord::Migration[6.1]
  def change
    create_table :contact_numbers do |t|
      t.string :number, null: false
      t.string :numType
      t.string :extension
      t.references :emergency_contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
