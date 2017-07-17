# README

This application allows you to view up to 25 recent tweets from any Twitter user of your choice.

To get started, go to http://www.twitterviewer.herokuapp.com and type in "twitter" as both the name and password.

To run it locally, clone the repo, `bundle install`, `npm install`, and `foreman start -f Procfile`. You can also `rake test`.

## Overview of the app:

* Built using Rails 5.1 with React via the Webpacker gem

* No page refreshes necessary ✅

* Requests cached for 5 minutes ✅

* Integration tests to cover main features ✅

* HTTP Basic Auth to keep it private ✅

* Some basic error handling ✅


## About the design choices involved:

I used the native integration of Rails and React to build this project because I saw how easily the data would flow from container to child components, and because a SPA style site would give the user a nice experience.

I chose to use an ActiveSupport Cache instead of caching in the DB for some obvious reasons, especially including the auto-expiration feature.

Thank you for reviewing this application! 
