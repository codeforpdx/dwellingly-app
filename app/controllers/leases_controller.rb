class LeasesController < ApplicationController
  before_action :set_lease, only: %i[ show update destroy ]
  after_action :verify_authorized

  def index
    @leases = authorize Lease.all
  end

  def show
    authorize Lease
  end

  def create
    @lease = authorize Lease.new(lease_params)

    if @lease.save
      render :show, status: :created
    else
      render json: @lease.errors, status: :unprocessable_entity
    end
  end

  def update
    authorize @lease
    if @lease.update(lease_params)
      render :show, status: :ok
    else
      render json: @lease.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @lease
    @lease.destroy
    head :no_content
  end

  private

  def set_lease
    @lease = Lease.find(params[:id])
  end

  def lease_params
    params.require(:lease).permit(:propertyID, :tenantID, :occupants, :dateTimeStart, :dateTimeEnd, :unitNum)
  end
end
