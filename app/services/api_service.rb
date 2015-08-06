class ApiService

  def initialize(widget, user)
    @engine = widget.engine
    @response_wrapper = widget.response_wrapper
    @user = user
  end

  def auth
    {username: @user.api_key, password: @user.api_token}
  end

  def url_generator
    [
      "http://api-impac-uat.maestrano.io/api/v1/get_widget?",
      "metadata[organization_ids][]=",
      @user.organizations[0].api_id,
      "&engine=",
      @engine
    ].join
  end

  def query
    response_with_wrapper = HTTParty.get( url_generator, {basic_auth: auth} )
    return response = response_with_wrapper["content"][@response_wrapper]
  end

end
