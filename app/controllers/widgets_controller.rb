class WidgetsController < ApplicationController
  # before_action :authenticate_user
  before_action :check_auth, only: [:dashboard, :index, :show]
  API_URL = "http://api-impac-uat.maestrano.io/api/v1/get_widget?metadata[organization_ids][]=org-fbte&engine=hr/employees_list"
  # API_URL = Rails.application.secrets.API_url
  USER = Rails.application.secrets.API_user
  PASS = Rails.application.secrets.API_pass

  def dashboard
    # byebug
    # @user_id = session[:user]
  end

  def index
    @widgets = Widget.all
    render json: @widgets
  end

  def show
    @widget = Widget.find(params[:id])
    # url_and_engine = API_URL + @widget.engine
    response = HTTParty.get(API_URL, {basic_auth: {username: USER, password: PASS} } )
    @data = response
    # render json: @data
    respond_to do |format|
      format.html { render nothing: true }
      format.json { render json: @data }
    end
  end

  private

  def check_auth
    authenticate_or_request_with_http_basic do |u, p |
      resource = User.find_by(username: u)
      if resource.valid_password?(p)
        sign_in :user, resource
      end
    end
  end

  # def authenticate_user
  #   authenticate_or_request_with_http_basic do |u, p|
  #     user_for_auth = User.find_by(user: u)
  #     user_for_auth && user_for_auth.password == p
  #   end
  # end

end
