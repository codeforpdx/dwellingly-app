class TicketsController < ApplicationController
  before_action :set_ticket, only: %i[ show edit update destroy ]

  def index
    @tickets = Ticket.includes(:author, :notes, tenant: :staff)
    @tickets.where(tenant_id: params[:tenant_id]) if params[:tenant_id]
  end

  def show
  end

  def new
    @ticket = Ticket.new
  end

  def edit
  end

  def create
    @ticket = Ticket.new(ticket_params.merge(author: current_user))

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
    @ticket.destroy
    head :no_content
  end

  def bulk_delete
    Ticket.where(id: params[:ids]).destroy_all
  end

  private

  def set_ticket
    @ticket = Ticket.find(params[:id])
  end

  def ticket_params
    params.require(:ticket).permit(:issue, :tenant_id, :status, :urgency)
  end
end
