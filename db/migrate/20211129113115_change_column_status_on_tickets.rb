class ChangeColumnStatusOnTickets < ActiveRecord::Migration[6.1]
  def change
    change_column :tickets, :status, 'integer USING CAST(status AS integer)'
  end
end
