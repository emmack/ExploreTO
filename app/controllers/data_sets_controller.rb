class DataSetsController < ApplicationController
  before_filter :require_login
  
  def download
    send_file(specific_document) # sanitize params
    @data_set.favourite_data.downloaded = true
  end

  private
  def specific_document # sanitize params
    @data_set.document_file
  end
end
