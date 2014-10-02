class FavouriteDataController < ApplicationController
  before_filter :require_login, :load_user

  def new
    @favourite_data = FavouriteData.new
  end

  def create
    @favourite_data = FavouriteData.new(favourite_data_params)
    @favourite_data.user_id = current_user.id 

    if @favourite_data.save
      redirect_to user_path(current_user)
    else
      render :new, alert: "Something went wrong!"
    end
  end

  def show
    @favourite_data = @user.favourite_data
  end

  def download
    send_file(specific_document) # sanitize params
    @favourite_data.downloaded = true
  end

  private
  def favourite_data_params
    params.require(:favourite_data).permit(:data_set)
  end

  def specific_document # sanitize params
    @favourite_data.data_set.document_file
  end

  def load_user
    @user = User.find(params[:user_id]) ## FIX THIS
  end
end
