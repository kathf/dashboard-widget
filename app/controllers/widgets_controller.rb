class WidgetsController < ApplicationController
  before_action :authenticate

  def dashboard
    @widgets = Widget.all
    respond_to do |format|
      format.html
      format.json { render json: @widgets }
    end
  end

  def authenticate
  end

end
