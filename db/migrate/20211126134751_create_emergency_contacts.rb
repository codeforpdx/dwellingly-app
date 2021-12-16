class CreateEmergencyContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :emergency_contacts do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :description

      t.timestamps
    end
  end
end
