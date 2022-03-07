class TenantsController < ApplicationController
  before_action :find_tenant, only: %i[ show update destroy ]
  after_action :verify_policy_scoped, except: :create
  after_action :verify_authorized, only: %i[ create update destroy ]

  def index
    @tenants = policy_scope(Tenant.includes(:staff, :property))
  end

  def show
  end

  def create
    @tenant = authorize(Tenant).new(create_params)

    if @tenant.save
      render :show, status: :created
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @tenant
    if @tenant.update(tenant_params)
      render :show, status: :ok
    else
      render json: @tenant.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @tenant
    @tenant.destroy
    head :no_content
  end

  private

  def find_tenant
    @tenant = policy_scope(Tenant).find(params[:id])
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
