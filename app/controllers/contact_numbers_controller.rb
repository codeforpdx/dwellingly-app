class ContactNumbersController < ApplicationController
  before_action :contact_number, only: %i[ show edit update destroy ]

  def index
    @api_contact_numbers = ContactNumber.all
  end

  def show
  end

  def new
    @contact_number = ContactNumber.new
  end

  def edit
  end

  def create
    @contact_number = ContactNumber.new(api_contact_number_params)

    respond_to do |format|
      if @contact_number.save
        format.html { redirect_to @contact_number, notice: "Contact number was successfully created." }
        format.json { render :show, status: :created, location: @contact_number }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @contact_number.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @contact_number.update(api_contact_number_params)
        format.html { redirect_to @contact_number, notice: "Contact number was successfully updated." }
        format.json { render :show, status: :ok, location: @contact_number }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @contact_number.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @contact_number.destroy
    respond_to do |format|
      format.html { redirect_to api_contact_numbers_url, notice: "Contact number was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def contact_number
    @contact_number = ContactNumber.find(params[:id])
  end

  def contact_number_params
    params.require(:contact_number).permit(:number, :numType, :extension, :emergency_contact_id)
  end
end
