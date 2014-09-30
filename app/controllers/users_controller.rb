class UsersController < ApplicationController
<<<<<<< HEAD
  skip_before_filter :require_login, only: [:index, :new, :create]
=======
>>>>>>> 590302ca8661b45de3f9a25fcaf356f64553edb6

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
<<<<<<< HEAD
    @user = User.new(user_params)

    if @user.save
      redirect_to users_path, notice: "Signed up!"
    else
      render :new
=======
    @user = User.create(user_params)

    if @user.save
      redirect_to root_path
    else
      render :new, alert: "Please try again"
>>>>>>> 590302ca8661b45de3f9a25fcaf356f64553edb6
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
<<<<<<< HEAD
    
  end

  def update
    
  end

  def destroy
    
=======
  end

  def update
  end

  def destroy
>>>>>>> 590302ca8661b45de3f9a25fcaf356f64553edb6
  end

  private
  def user_params
<<<<<<< HEAD
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
=======
    params.require(:user).permit(:email, :password, :password_confirmation, :name)
>>>>>>> 590302ca8661b45de3f9a25fcaf356f64553edb6
  end
end
