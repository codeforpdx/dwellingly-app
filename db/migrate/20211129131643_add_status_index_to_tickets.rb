class AddStatusIndexToTickets < ActiveRecord::Migration[6.1]
  def change
    add_index :tickets, :status
  end
end
