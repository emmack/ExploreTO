class UsersController < ApplicationController

  # before_action :load_user, only: [:show, :edit, :update, :destroy]
  # skip_before_filter :require_login, only: [:index, :new, :create, :home, :about, :contact, :login, :graphs]

  def home
    render :home
  end

  def login
    @users = User.all
  end
  def index
      @graph = Graph.new
    end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      auto_login(@user)
      redirect_to users_path, notice: "Signed up!"
    else
      render :new
    end
  end

  def show
  end
 
  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatar)
  end

  def load_user
    @user = User.find(params[:id])
  end
end
