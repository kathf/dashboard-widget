class WidgetsController < ApplicationController

  def dashboard
  end

  def index
    @widgets = Widget.all
    respond_to do |format|
      format.json {render json: @widgets}
    end
  end

  def show
    @widget = Widget.find(params[:id])
    data = ApiService.new(@widget, current_user).query
    render json: data
  end

end
