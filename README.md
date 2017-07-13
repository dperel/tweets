# README

This application allows you to view up to 25 recent tweets from any Twitter user of your choice.

To get started, go to http://www.twitterviewer.herokuapp.com and type in "twitter" as both the name and password.

To run it locally, clone the repo, `bundle install`, and `foreman start -f Procfile`. You can also `rake test`.

About this app:

* Built using Rails 5.1 with React via the Webpacker gem

* No page refreshes necessary ✅

* Requests cached for 5 minutes ✅

* Integration tests to cover main features ✅

* HTTP Basic Auth to keep it private ✅
