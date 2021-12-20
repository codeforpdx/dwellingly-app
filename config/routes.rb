Rails.application.routes.draw do
  root 'react#index'

  scope :api, defaults: { format: 'json' } do
    devise_for :users, controllers: {
      sessions: 'sessions', invitations: 'invitations',
      registrations: 'registrations'
    }

    resource :dashboard, only: :show
    resources :emergency_contacts
    resources :contact_numbers
    resources :tenants
    resources :properties
    resources :staff, only: :index, controller: :staffs
    resources :unauthorized_users, only: [:index, :destroy]
    resources :leases
    delete 'tickets/bulk_delete', to: 'tickets#bulk_delete'
    resources :tickets do
      resources :notes, only: [:create, :update, :destroy]
    end
    resources :property_managers, only: :index
    resources :users, only: [:show, :update] do
      patch '/authorize', to: 'users#authorize'
    end
    get 'staff_members', to: 'users#staff_members'
  end

  devise_scope :user do
    get 'api/cypress_sign_in' => 'sessions#cypress_sign_in' if Rails.env.development?
  end

  get '*page', to: 'react#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }
end