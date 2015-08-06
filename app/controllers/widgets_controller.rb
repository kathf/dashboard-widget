class WidgetsController < ApplicationController

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
    response = HTTParty.get( url_generator, {basic_auth: auth} )
    @data = response
    render json: @data
    # respond_to do |format|
    #   format.html { render nothing: true }
    #   format.json { render json: @data }
    # end
  end

  private

  def auth
    {username: current_user.api_key, password: current_user.api_token}
  end

  def url_generator
    Rails.application.secrets.API_url + "metadata[organization_ids][]=" + current_user.organizations[0].api_id + "&engine=" + @widget.engine
  end

end
