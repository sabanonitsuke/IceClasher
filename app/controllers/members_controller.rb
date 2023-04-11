class MembersController < ApplicationController
  def create
    member = Member.create(name: params[:name], attendance: true, lounge_id: params[:lounge_id])
    render json:{ member: member }
  end
end
