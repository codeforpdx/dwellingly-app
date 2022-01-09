class EmergencyContactsController < ApplicationController
  skip_before_action :authenticate_user!
  before_action :set_emergency_contact, only: %i[ show edit update destroy ]

  def index
    @emergency_contacts = EmergencyContact.includes(:contact_numbers)
  end

  def show
  end

  def new
    @emergency_contact = EmergencyContact.new
  end

  def edit
  end

  def create
    @emergency_contact = EmergencyContact.new(emergency_contact_params)

    if @emergency_contact.save
      render :show, status: :created
    else
      render json: @emergency_contact.errors, status: :unprocessable_entity
    end
  end

  def update
    if @emergency_contact.update(emergency_contact_params)
      render json: :ok
    else
      render json: @emergency_contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @emergency_contact.destroy
    head :no_content
  end

  private

  def set_emergency_contact
    @emergency_contact = EmergencyContact.find(params[:id])
  end

  def emergency_contact_params
    params.require(:emergency_contact).permit(
      :name, :description, contact_numbers_attributes: [:number, :numType, :extension]
    )
  end
end
