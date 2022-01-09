class ContactNumbersController < ApplicationController
  before_action :contact_number, only: %i[ show edit update destroy ]

  def index
    @contact_numbers = ContactNumber.all
  end

  def show
  end

  def new
    @contact_number = ContactNumber.new
  end

  def edit
  end

  def create
    @contact_number = ContactNumber.new(contact_number_params)

    if @contact_number.save
      render :show, status: :created
    else
      render json: @contact_number.errors, status: :unprocessable_entity
    end
  end

  def update
    if @contact_number.update(contact_number_params)
      render :show, status: :ok
    else
      render json: @contact_number.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact_number.destroy
    head :no_content
  end

  private

  def contact_number
    @contact_number = ContactNumber.find(params[:id])
  end

  def contact_number_params
    params.require(:contact_number).permit(:number, :numType, :extension, :emergency_contact_id)
  end
end
