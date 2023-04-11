class MembersController < ApplicationController
  def create
    member = Member.create(members_params)
    render json:{ member: member }
  end

  private
  def members_params
    params.require(:member).permit(:name).merge(attendance: :ture, louge_id: params[:lounge_id])
  end
end
