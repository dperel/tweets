require 'test_helper'

class TwitterControllerTest < ActionDispatch::IntegrationTest

    test "it can access the main page only when authenticated" do

        get '/main'
        assert_equal 401, status

        get '/main', headers: {'HTTP_AUTHORIZATION': ActionController::HttpAuthentication::Basic.encode_credentials("twitter", "twitter")}
        assert_equal 200, status

    end

    test "#pull_tweets returns an array of tweets when given a real handle" do

        post '/pull_tweets.json', params: {handle: "nyt"}, headers: {'HTTP_AUTHORIZATION': ActionController::HttpAuthentication::Basic.encode_credentials("twitter", "twitter")}

        assert_equal 200, status
        json = JSON.parse(response.body)
        assert_equal Array, json.class
        refute_empty json

    end

    test "#pull_tweets returns an empty array for a nonexistent handle" do

        post '/pull_tweets.json', params: {handle: "921830912830912830218030912"}, headers: {'HTTP_AUTHORIZATION': ActionController::HttpAuthentication::Basic.encode_credentials("twitter", "twitter")}

        assert_equal 200, status
        json = JSON.parse(response.body)
        assert_equal Array, json.class
        assert_empty json

    end

    test "#pull_tweets linkifies user handles" do

        post '/pull_tweets.json', params: {handle: "walmart"}, headers: {'HTTP_AUTHORIZATION': ActionController::HttpAuthentication::Basic.encode_credentials("twitter", "twitter")}

        assert_equal 200, status

        if response.body.include?("@")
            assert_includes response.body, "href='http://twitter.com/"
        else
            puts "WARNING: This tweet pull from Walmart did not include any handles, which is suspicious."
        end

    end

    test "Results are cached when done close together" do

        client = Twitter::REST::Client.new do |config|
			config.consumer_key = ENV["consumer_key"]
			config.consumer_secret = ENV["consumer_secret"]
			config.access_token = ENV["access_token"]
			config.access_token_secret= ENV["access_token_secret"]
		end

        resp = client.get('/1.1/application/rate_limit_status.json')
        remaining_before_calls = resp[:resources][:search].values[0][:remaining]

        # call the local endpoint 5 times 
        5.times do
            post '/pull_tweets.json', params: {handle: "target"}, headers: {'HTTP_AUTHORIZATION': ActionController::HttpAuthentication::Basic.encode_credentials("twitter", "twitter")}
        end

        resp_2 = client.get('/1.1/application/rate_limit_status.json')
        remaining_after_calls = resp_2[:resources][:search].values[0][:remaining]

        # If the requests were not cached, we'd exect the difference to be 5, not 1
        assert_equal 1, remaining_before_calls - remaining_after_calls

    end

end
