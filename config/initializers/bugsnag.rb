Bugsnag.configure do |config|
  config.api_key = Rails.application.credentials.bugsnag
end
