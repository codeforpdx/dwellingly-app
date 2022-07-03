class PropertiesController < ApplicationController
  before_action :set_property, only: %i[ show update destroy ]

  def index
    @properties = policy_scope(Property.includes(:property_managers, :tenants))
  end

  def show
  end

  def create
    @property = authorize Property.new(property_params)

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
    skip_authorization
    @property = policy_scope(Property).find(params[:id])
  end

  def property_params
    params.require(:property)
      .permit(:name, :address, :num_units, :city, :state, :zipcode, :archived)
      .merge(
        { property_manager_ids: params.fetch(:propertyManagerIDs, []) }
      )
  end
end
