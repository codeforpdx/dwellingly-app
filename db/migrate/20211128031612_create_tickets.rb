class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_table :tickets do |t|
      t.string :issue
      t.references :tenant, null: false, foreign_key: true
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.string :status, null: false
      t.string :urgency

      t.timestamps
    end
  end
end
