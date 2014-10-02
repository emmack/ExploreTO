class DataSetsController < ApplicationController

  
  def show
    @data_set = DataSet.find(params[:id])
  end

end
