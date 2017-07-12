class TwitterController < ApplicationController
	http_basic_authenticate_with name: "twitter", password: "twitter"
	skip_before_action :verify_authenticity_token, only: :pull_tweets
	before_action :twitter_client

	@@cache = ActiveSupport::Cache::MemoryStore.new

	def main
		respond_to(:html)
	end

	def pull_tweets

		handle = handle_params[:handle].downcase

		raise ArgumentError, "No handle given" unless handle.present?

		@tweets = @@cache.read(handle)

		# If we don't have tweets, fetch from Twitter and store
		if @tweets.nil?

			@tweets = get_tweets(handle)

			@@cache.write(handle, @tweets, expires_in: 5.minutes)

		end

		respond_to do |format|
			format.json { render json: @tweets.to_json }
		end

	end


private

	def handle_params
		params.permit(:handle)
	end

	# Return only needed data from Twitter
	def get_tweets(handle)
		array = []
		@@twitter_client.search("from:#{handle}", result_type: "recent").take(25).each do |t|
			array << [t.created_at, t.text]
		end
		array
	end

	def twitter_client

		# log in the application as a client and memoize it as a class variable
		@@twitter_client ||= Twitter::REST::Client.new do |config|
			config.consumer_key = ENV["consumer_key"]
			config.consumer_secret = ENV["consumer_secret"]
			config.access_token = ENV["access_token"]
			config.access_token_secret= ENV["access_token_secret"]
		end

	end

end
