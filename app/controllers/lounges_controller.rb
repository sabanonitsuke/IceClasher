class LoungesController < ApplicationController
  before_action :push_sign_in, only: [:new, :create]
  before_action :require_valid_password, only: :show
  before_action :check_password, only: :check

  def index
    @lounges = current_user.lounges if user_signed_in?
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

  def show
    @lounge = Lounge.find(params[:id])
  end

  def password_request
    @lounge =  Lounge.find(params[:lounge_id])
  end

  def check
    session[:password_valid_for] ||= {}
    session[:password_valid_for][params[:lounge_id]] = true
    redirect_to lounge_path(params[:lounge_id])
  end

  private
  def lounge_params
    params.require(:lounge).permit(:name, :password).merge(user_id: current_user.id)
  end

  def push_sign_in
    redirect_to new_user_session_path unless user_signed_in?
  end

  def check_password
    password = params[:password]
    lounge = Lounge.find(params[:lounge_id])
    binding.pry
    unless password && lounge.authenticate(params[:password])
      flash[:alert] = 'パスワードが間違っています。'
      redirect_to lounge_password_request_path(params[:lounge_id])
    end
  end

  def require_valid_password
    unless session[:password_valid_for]&.[](params[:id])
      redirect_to lounge_password_request_path(params[:id])
    end
  end

end
