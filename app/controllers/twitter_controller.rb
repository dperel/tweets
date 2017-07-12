class TwitterController < ApplicationController
	http_basic_authenticate_with name: "twitter", password: "twitter"
	skip_before_action :verify_authenticity_token, only: :pull_tweets

	def main
		respond_to(:html)
	end

	def pull_tweets

		handle = handle_params[:handle]

		raise ArgumentError, "No handle given" unless handle

		cached_tweets = Rails.cache.read(handle)

		# If we have cached tweets and they are fresh, render them
		if !cached_tweets.nil? && (cached_tweets[:timestamp] > 5.minutes.ago)

			@tweets = Rails.cache.read(handle)['tweets']

		# Otherwise, pull new tweets and cache them
		else

			# Pull tweets
			@tweets = get_tweets(handle)

			# Write tweets to cache
			hash = {}
			hash[handle] = {tweets: response, timestamp: Time.now }
			Rails.cache.write(hash)

		end

	end


private

	def get_tweets(handle)

		# use twitter gem to pull tweets

		# if error, return with error message in order to prevent caching

	end

	def handle_params
		params.permit(:handle)
	end

end
