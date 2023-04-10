class LoungesController < ApplicationController
  before_action :push_sign_in, only: [:new, :create, :edit, :update, :destroy]
  before_action :get_lounge, only: [:show, :edit, :update, :destroy]
  before_action :author_confirmation, only: [:edit, :update, :destroy]
  before_action :require_valid_password, only: :show
  before_action :check_password, only: :check
  before_action :get_lounges_item, only: :show

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
  end

  def edit
  end

  def update
    if @lounge.update(lounge_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    if @lounge.destroy
      redirect_to root_path
    else
      redirect_to root_path
    end
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
    params.require(:lounge).permit(:name, :time_limit, :password).merge(user_id: current_user.id)
  end

  def push_sign_in
    redirect_to new_user_session_path unless user_signed_in?
  end

  def get_lounge
    @lounge = Lounge.find(params[:id])
  end

  def get_lounges_item
    @member = Member.new
    @members = @lounge.members
  end

  def author_confirmation
    redirect_to root_path unless current_user.id == @lounge.user.id
  end


  # あいことば関連のアクション
  def check_password
    password = params[:password]
    lounge = Lounge.find(params[:lounge_id])
    unless password && lounge.authenticate(params[:password])
      flash[:alert] = 'あいことば が違います'
      redirect_to lounge_password_request_path(params[:lounge_id])
    end
  end

  def require_valid_password
    return if user_signed_in? && current_user.id == @lounge.user.id
    unless session[:password_valid_for]&.[](params[:id])
      redirect_to lounge_password_request_path(params[:id])
    end
  end

end
