class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # before_filter :require_login
  before_filter :set_page

  def set_page
  	@page_name = "#{controller_name}-#{action_name}"
  end

  private

  def not_authenticated
    redirect_to login_path, alert: "Please login first"
  end
end
