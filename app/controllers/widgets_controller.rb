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
    data = ApiService.new(@widget, current_user).query
    respond_to do |format|
      format.html { render layout: false }
      format.json { render json: data }
    end
  end

end
