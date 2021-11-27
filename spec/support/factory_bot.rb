require 'fixtures/files/seed_helper'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  config.include SeedHelper
end
