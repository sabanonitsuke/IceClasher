class LoungesController < ApplicationController
  before_action: 
  def index
    
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
end
