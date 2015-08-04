class WidgetsController < ApplicationController
  before_action: :set_widget, only: [:show]

  def dashboard
  end

  def show
  end

  private

  def set_widget
    @widget = Widget.find(params[:id])
  end

end
