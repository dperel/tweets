require 'test_helper'

class TwitterControllerTest < ActionDispatch::IntegrationTest

    setup do

    end

    test "it can access the main page only when authenticated" do

        get '/main'
        assert_equal 401, status

        get '/main', headers: {'HTTP_AUTHORIZATION': ActionController::HttpAuthentication::Basic.encode_credentials("twitter", "twitter")}
        assert_equal 200, status

    end
end
