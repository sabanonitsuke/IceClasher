class LoungesController < ApplicationController
  before_action :push_sign_in, only: [:new, :create]
  def index
    @lounges = current_user.louges
  end

  def new
    @lounge = Lounge.new
  end
  
  def create
    @lounge = Lounge.new(lounge_params)
    if @lounge.save
      redirect_to root_path
    else
      render :new
    end
  end

  private
  def lounge_params
    params.require(:lounge).permit(:name, :password).merge(user_id: current_user.id)
  end

  def push_sign_in
    redirect_to new_user_session_path unless user_signed_in?
  end
end
