class FavouritesController < ApplicationController
  before_filter :require_login
  skip_before_action :verify_authenticity_token, only: :download

  def index
    @favourites = Favourite.where('user_id = ?', params[:user_id])
  end

  def new
    @favourite = Favourite.new
  end

  def create
    @favourite = Favourite.new(favourite_params)
    @favourite.user_id = current_user.id 
    @favourite.downloaded = false

    if @favourite.save
      redirect_to user_path(current_user)
    else
      render :new, alert: "Something went wrong!"
    end
  end

  def show
    @favourite = current_user.favourites
  end

  def download # not quite working yet — want it to download file and also mark downloaded as true
    @favourite = Favourite.find(params[:favourite])
    @favourite.data_set = DataSet.find(params[:data_set])
    send_file "#{Rails.root}/public#{@favourite.data_set.file}"
    @favourite.downloaded = true
    @favourite.save
  end

  private
  def favourite_params
    params.require(:favourite).permit(:data_set)
  end

end
