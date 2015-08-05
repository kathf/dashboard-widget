class WidgetsController < ApplicationController
  before_action :authenticate_user
  API_URL = Rails.application.secrets.API_url

  def dashboard
    byebug
    @user_id = session[:user]
  end

  def index
    @widgets = Widget.all
    respond_to do |format|
      format.html
      format.json { render json: @widgets }
    end
  end

  def show
    @widget = Widget.find(params[:id])
    response = HTTParty.get('API_URL')
    @data = response.body
    byebug
    render json: @data
  end

  def authenticate_user
    authenticate_or_request_with_http_basic do |u, p|
      user_for_auth = User.find_by(user: u)
      user_for_auth && user_for_auth.password == p
    end
  end
end
