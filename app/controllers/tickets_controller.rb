class TicketsController < ApplicationController
  wrap_parameters exclude: :tenant_id

  before_action :find_ticket, only: %i[ show update destroy ]
  before_action :find_tenant, only: %i[ create ]
  after_action :verify_authorized, only: %i[ destroy bulk_delete ]
  after_action :verify_policy_scoped, except: %i[ destroy bulk_delete ]

  def index
    @tickets = policy_scope(Ticket).includes(:author, :notes, tenant: :staff)
    @tickets.where(tenant_id: params[:tenant_id]) if params[:tenant_id]
  end

  def show
  end

  def create
    @ticket = Ticket.new(ticket_params.merge(author: current_user, tenant_id: @tenant.id))

    if @ticket.save
      render :show, status: :created
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  def update
    if @ticket.update(ticket_params)
      render :show, status: :ok
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize Ticket
    @ticket.destroy
    head :no_content
  end

  def bulk_delete
    authorize Ticket
    Ticket.where(id: params[:ids]).destroy_all
    head :no_content
  end

  private

  def find_ticket
    @ticket = policy_scope(Ticket).find(params[:id])
  end

  def find_tenant
    @tenant = policy_scope(Tenant).find(params[:tenant_id])
  end

  def ticket_params
    params.require(:ticket).permit(:issue, :status, :urgency)
  end
end
