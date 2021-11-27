class NotesController < ApplicationController
  before_action :find_ticket
  before_action :find_note, only: %i[ update destroy ]

  def create
    @note = @ticket.notes.new(note_params.merge(user: current_user))

    if @note.save
      render :show, status: :created
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def update
    if @note.update(note_params)
      render :show, status: :ok
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @note.destroy
    head :no_content
  end

  private

  def find_ticket
    @ticket = Ticket.find(params[:ticket_id])
  end

  def find_note
    @note = @ticket.notes.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:text, :user_id, :ticket_id)
  end
end
