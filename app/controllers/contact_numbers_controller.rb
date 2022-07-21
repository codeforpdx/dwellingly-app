class ContactNumbersController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[ index show ]
  before_action :contact_number, only: %i[ show update destroy ]
  after_action :verify_authorized, only: %i[ create update destroy ]

  def index
    @contact_numbers = ContactNumber.all
  end

  def show
  end

  def create
    @contact_number = authorize ContactNumber.new(contact_number_params)

    if @contact_number.save
      render :show, status: :created
    else
      render json: @contact_number.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @contact_number
    if @contact_number.update(contact_number_params)
      render :show, status: :ok
    else
      render json: @contact_number.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @contact_number
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
