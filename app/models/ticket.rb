class Ticket < ApplicationRecord
  has_many :notes, dependent: :destroy
  belongs_to :tenant
  belongs_to :author, class_name: 'User'

  enum status: { open: 0, in_progress: 1, closed: 2 }

  def status_p
    return 'New' if status == :open

    status.titleize
  end

  # Temporary legacy support
  def status=(value)
    statuses = {
      'New'         => :open,
      'In Progress' => :in_progress,
      'Closed'      => :closed
    }
    self[:status] = statuses[value]
  end
end
