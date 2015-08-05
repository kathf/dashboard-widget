class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :check_auth

  private

  def check_auth
    authenticate_or_request_with_http_basic do |u, p |
      resource = User.find_by(username: u)
      if resource.valid_password?(p)
        sign_in :user, resource
      end
    end
  end
end
