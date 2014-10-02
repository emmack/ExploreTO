class FavouritesController < ApplicationController
  before_filter :require_login

  def index
    @favourites = Favourite.find_by(params[:user_id])
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

  def download
    send_file(specific_document) # sanitize params
    @favourite.downloaded = true
  end

  private
  def favourite_params
    params.require(:favourite).permit(:data_set)
  end

  def specific_document # sanitize params
    @favourite.data_set.s
  end

end
