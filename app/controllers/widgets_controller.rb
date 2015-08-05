class WidgetsController < ApplicationController
  # before_action :authenticate

  def dashboard
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
  end

  # def authenticate
  #   # Assuming we defined API_KEY_REGEX elsewhere
  #   return render(:text => 'Invalid API key.') unless params[:api_key] =~ API_KEY_REGEX
  #
  #   # You may want to validate the key against your database and/or log the request
  #   return render(:text => 'Invalid API key.') if not @key = Key.find_by_hash(params[:api_key])
  #
  # end

end
