class TenantsController < ApplicationController
  before_action :set_tenant, only: %i[ show edit update destroy ]

  def index
    @tenants = Tenant.includes(:staff, :property)
  end

  def show
  end

  def new
    @tenant = Tenant.new
  end

  def edit
  end

  def create
    @tenant = Tenant.new(create_params)

    if @tenant.save
      render :show, status: :created
    else
      format.json { render json: @tenant.errors, status: :unprocessable_entity }
    end
  end

  def update
    if @tenant.update(tenant_params)
      render :show, status: :ok
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tenant.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  def tenant_params
    params.require(:tenant).permit(
      :firstName, :lastName, :phone, :archived,
      staff_ids: [], lease_attributes: [:occupants, :unitNum, :property_id, :dateTimeStart, :dateTimeEnd]
    )
  end

  def create_params
    tenant_params.merge({ staff_ids: params[:staff_ids] })
  end
end
