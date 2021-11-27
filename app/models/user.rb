class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tickets, dependent: :restrict_with_exception, foreign_key: :author_id, inverse_of: :author

  scope :active, -> { where(archived: false) }

  def full_name
    "#{firstName} #{lastName}"
  end
end
