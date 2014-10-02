class DataSetsController < ApplicationController
  before_filter :require_login
  
  def download
    send_file(specific_document)
  end

  private
  def specific_document
    @data_set.document_file
  end
end
