class MembersController < ApplicationController
  def create
    member = Member.create(name: params[:name], attendance: true, lounge_id: params[:lounge_id])
    render json:{ member: member }
  end

  def destroy
    Member.find(params[:id]).destroy
    head :no_content
  end
end
