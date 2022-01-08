class UnauthorizedUser < User
  def approved?
    false
  end
end
