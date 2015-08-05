class WidgetsController < ApplicationController
  # API_URL = "http://api-impac-uat.maestrano.io/api/v1/get_widget?metadata[organization_ids][]=org-fbte&engine=hr/employees_list"
  PASS = Rails.application.secrets.API_pass
  USER = Rails.application.secrets.API_user

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
    url = url_generator
    response = HTTParty.get(url, {basic_auth: {username: USER, password: PASS} } )
    @data = response
    render json: @data
    # respond_to do |format|
    #   format.html { render nothing: true }
    #   format.json { render json: @data }
    # end
  end

  private

  def url_generator
    Rails.application.secrets.API_url + "metadata[organization_ids][]=" + current_user.organizations[0].api_id + "&engine=" + @widget.engine
  end

end
