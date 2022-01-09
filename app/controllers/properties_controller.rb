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

    if @property.save
      render :show, status: :created
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def update
    if @property.update(property_params)
      render :show, status: :ok
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @property.destroy
    head :no_content
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
