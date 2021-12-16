class Dashboard
  def open
    @open ||= Ticket.open
  end

  def latent_open
    open.where('updated_at > ?', 1.day.ago)
  end

  def in_progress
    @in_progress ||= Ticket.in_progress
  end

  def latent_in_progress
    in_progress.where('updated_at > ?', 1.week.ago)
  end

  def managers
    PropertyManager.includes(:default_property).order(created_at: :desc).take 3
  end

  def pending_users
    UnauthorizedUser.active
  end

  def staff
    Staff.active
  end

  def tenants
    Tenant.includes(:property, :property_managers).active.unstaffed
  end
end
