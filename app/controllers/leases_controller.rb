class LeasesController < ApplicationController
  before_action :set_lease, only: %i[ show edit update destroy ]

  def index
    @leases = Lease.all
  end

  def show
  end

  def new
    @lease = Lease.new
  end

  def edit
  end

  def create
    @lease = Lease.new(lease_params)

    if @lease.save
      render :show, status: :created
    else
      render json: @lease.errors, status: :unprocessable_entity
    end
  end

  def update
    if @lease.update(lease_params)
      render :show, status: :ok
    else
      render json: @lease.errors, status: :unprocessable_entity
    end
  end

  def destroy
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
