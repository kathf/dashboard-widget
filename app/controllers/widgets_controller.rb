class WidgetsController < ApplicationController
    http_basic_authenticate_with name: Rails.application.secrets.API_user, password: Rails.application.secrets.API_pass
    # before_action :set_widget, only: [:show]

  def dashboard
  end

  def show
  end

  private

  def set_widget
    @widget = Widget.find(params[:id])
  end

end
