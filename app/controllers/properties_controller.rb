class PropertiesController < ApplicationController
  before_action :set_property, only: %i[ show edit update destroy ]

  def index
    @properties = Property.includes(:property_managers, :tenants)
  end

  def show
  end

  def new
    @property = Property.new
  end

  def edit
  end

  def create
    @property = Property.new(create_params)

    respond_to do |format|
      if @property.save
        format.json { render :show, status: :created, location: @api_property }
      else
        format.json { render json: @api_property.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @property.update(property_params)
        format.html { redirect_to @api_property, notice: "Property was successfully updated." }
        format.json { render :show, status: :ok, location: @api_property }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @api_property.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @property.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_property
    @property = Property.find(params[:id])
  end

  def property_params
    params.require(:property).permit(:name, :address, :num_units, :city, :state, :zipcode, :archived)
  end

  def create_params
    property_params.merge(
      { property_manager_ids: params.fetch(:propertyManagerIDs, []) }
    )
  end
end
