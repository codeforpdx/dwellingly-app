class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  scope :active, -> { where(archived: false) }

  def full_name
    "#{firstName} #{lastName}"
  end

  def approved?() = true
  def admin?() = is_a?(Admin)
  def staff?() = is_a?(Staff)
  def property_manager?() = is_a?(PropertyManager)
  def unauthorized_user?() = is_a?(UnauthorizedUser)
  def staff_level?() = admin? || staff?

  # Devise orverrides for authentication
  # Archived users cannot login.
  def active_for_authentication?
    super && !archived? && approved?
  end

  def inactive_message
    archived? ? :archived : super
  end
end
